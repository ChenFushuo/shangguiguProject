<template>
  <div>
    <el-card class="form_card">
      <el-form :inline="true" class="form">
        <el-form-item label="职位搜索">
          <el-input
            v-model="keyword"
            placeholder="请输入搜索的职位关键字"
            style="width: 200px" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="keyword === ''"
            @click="search">
            搜索
          </el-button>
          <el-button type="primary" size="default" @click="reset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table_card">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addOrEditRole"
        v-has="'btn.Role.add'">
        添加职位
      </el-button>
      <el-table class="table" :data="allRole" border>
        <el-table-column
          type="index"
          align="center"
          label="#"
          width="80"></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          show-overflow-hidden
          label="角色名称"
          align="center"
          prop="roleName"></el-table-column>
        <el-table-column
          show-overflow-hidden
          label="创建时间"
          align="center"
          prop="createTime"></el-table-column>
        <el-table-column
          show-overflow-hidden
          label="更新时间"
          align="center"
          prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setPermission(row)"
              v-has="'btn.Role.assgin'">
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="addOrEditRole(row)"
              v-has="'btn.Role.update'">
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定删除（${row.roleName}）吗?`"
              width="200px"
              @confirm="deleteRole(row)">
              <template #reference>
                <el-button
                  v-has="'btn.Role.remove'"
                  type="danger"
                  size="small"
                  icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-model:page="page"
        v-model:limit="limit"
        :page-sizes="pageSizes"
        :updateData="getHasRole"
        :total="total"
        :disabled="listLoading" />
    </el-card>
    <!-- 添加职位或者更新一个角色的弹窗结构 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle + '角色'">
      <el-form ref="form" :model="roleParams" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="roleParams.roleName"
            placeholder="请输入角色名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="default" @click="cancel">取消</el-button>
          <el-button type="primary" size="default" @click="save"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 抽屉组件，分配角色的菜单、按钮权限结构 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配菜单与按钮权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="tree"
          :data="menuArr"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectArr"
          :props="defaultProps" />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelDrawer">取消</el-button>
          <el-button type="primary" @click="confirmDrawer">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqAllRoleList,
  reqRemoveRole,
  reqSetPermission,
} from "@/api/acl/role";
import {
  MenuData,
  MenuList,
  MenuResponseData,
  RoleResponseData,
} from "@/api/acl/role/type";
import { Records, RoleData } from "@/api/acl/user/type";
import useLayoutSettingStore from "@/store/modules/setting";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";

const listLoading = ref<boolean>(false);
const pageSizes = ref<number[]>([5, 10, 20, 30, 40, 50]); // 表格分页，每夜条数筛选
let page = ref<number>(1); // 查询数据页码
let limit = ref<number>(10); // 查询每页条数
let total = ref<number>(0); // 表格数据总数
let keyword = ref<string>(""); // 搜索表单绑定值
let allRole = ref<Records>([]);
let settingStore = useLayoutSettingStore(); //获取模板setting仓库
let dialogVisible = ref<boolean>(false); // 控制对话框显示与隐藏
let dialogTitle = ref<string>(""); // 对话框标题
let roleParams = reactive<RoleData>({
  roleName: "",
});
// 自定义规则回调
const validatorRoleName = (role: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error("角色名称长度务必大于等于两位"));
  }
};
// 角色相关表单校验规则
let rules = {
  roleName: [{ required: true, trigger: "blur", validator: validatorRoleName }],
};
let form = ref<any>(); // 对话框表单ref对象
let drawer = ref<boolean>(false); // 控制抽屉显示与隐藏
let menuArr = ref<MenuList>([]); // 树形控件数据
let selectArr = ref<number[]>([]); // 选中的权限数据
let tree = ref<any>(); // 树形控件组件实例
const defaultProps = {
  children: "children",
  label: "name",
};

onMounted(() => {
  getHasRole();
});

// 获取所有角色信息
const getHasRole = async () => {
  listLoading.value = true;
  let result: RoleResponseData = await reqAllRoleList(
    page.value,
    limit.value,
    keyword.value
  );
  if (result.code === 200) {
    allRole.value = result.data.records;
    total.value = result.data.total;
    listLoading.value = false;
  }
};

// 表单搜索按钮
const search = () => {
  getHasRole();
};

// 重置按钮
const reset = () => {
  settingStore.refsh = !settingStore.refsh;
};

// 新增新的角色或添加已有角色
const addOrEditRole = (row: RoleData) => {
  Object.assign(roleParams, { roleName: "" });
  if (!row.id) {
    dialogTitle.value = "新增";
  } else {
    dialogTitle.value = "编辑";
    Object.assign(roleParams, row);
  }
  dialogVisible.value = true;
};

// 对话框取消
const cancel = () => {
  dialogVisible.value = false;
};

//  对话框确认
const save = async () => {
  await form.value.validate();
  let result: any = await reqAddOrUpdateRole(roleParams);
  if (result.code === 200) {
    ElMessage.success(`${dialogTitle.value}角色成功`);
    getHasRole();
    dialogVisible.value = false;
  } else {
    ElMessage.error(`${dialogTitle.value}角色失败`);
    dialogVisible.value = false;
  }
};

// 分配权限按钮回调
const setPermission = async (row: RoleData) => {
  Object.assign(roleParams, row);
  let result: MenuResponseData = await reqAllMenuList(row.id as number);
  if (result.code === 200) {
    menuArr.value = result.data;
    selectArr.value = filterSelectArr(menuArr.value, []);
    drawer.value = true;
  } else {
    ElMessage.error("获取菜单按钮权限数据失败，请重试");
  }
};
const filterSelectArr = (allData: MenuList, initArr: number[]) => {
  allData.forEach((item: MenuData) => {
    if (item.select && item.level === 4) {
      initArr.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr);
    }
  });
  return initArr;
};

// 抽屉取消按钮回调
const cancelDrawer = () => {
  drawer.value = false;
};

// 抽屉确认按钮回调
const confirmDrawer = async () => {
  let roleId = roleParams.id; // 被下发权限的角色
  let activeTreeNodes = tree.value.getCheckedKeys(); // 已经选中的树节点
  let halfTreeNodes = tree.value.getHalfCheckedKeys(); // 半选中的树节点
  let permissionId = activeTreeNodes.concat(halfTreeNodes);
  console.log(roleId, permissionId);

  let result: any = await reqSetPermission(roleId as number, permissionId);
  if (result.code === 200) {
    ElMessage.success("分配成功");
    window.location.reload();
    drawer.value = false;
  } else {
    ElMessage.error("分配失败");
    drawer.value = false;
  }
};

// 删除一个已有的角色 reqRemoveRole
const deleteRole = async (row: RoleData) => {
  let result: any = await reqRemoveRole(row.id as number);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getHasRole();
  } else {
    ElMessage.error("删除失败");
  }
};
</script>

<style lang="scss" scoped>
.form_card {
  height: 80px;
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
}
.table_card {
  margin: 10px 0;
  .table {
    margin: 10px 0;
  }
}
</style>
