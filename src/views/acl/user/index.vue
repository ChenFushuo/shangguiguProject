<template>
  <div>
    <el-card class="form_card">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input v-model="keyword" placeholder="请输入用户名"></el-input>
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
    <el-card class="pagemain_card">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addOrEditUser"
        v-has="'btn.User.add'">
        添加用户
      </el-button>
      <el-button
        type="primary"
        size="default"
        icon="Delete"
        :disabled="selectIdArr.length <= 0"
        @click="deleteSelectUser"
        v-has="'btn.User.remove'">
        批量删除
      </el-button>
      <!-- table展示用户信息 -->
      <el-table
        :data="userArr"
        @selection-change="selectChange"
        border
        style="margin: 10px 0">
        <el-table-column type="selection" align="center" />
        <el-table-column label="#" type="index" align="center" />
        <el-table-column label="ID" align="center" prop="id" />
        <el-table-column label="用户名字" align="center" prop="username" />
        <el-table-column label="用户名称" align="center" prop="name" />
        <el-table-column
          show-overflow-tooltip
          label="用户角色"
          align="center"
          prop="roleName" />
        <el-table-column
          show-overflow-tooltip
          label="创建时间"
          align="center"
          prop="createTime" />
        <el-table-column
          show-overflow-tooltip
          label="更新时间"
          align="center"
          prop="updateTime" />
        <el-table-column label="操作" width="300" align="center">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setRole(row)"
              v-has="'btn.User.assgin'">
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="addOrEditUser(row)"
              v-has="'btn.User.update'">
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定删除${row.username}吗?`"
              width="200px"
              @confirm="deleteUser(row)">
              <template #reference>
                <el-button
                  v-has="'btn.User.remove'"
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
        :updateData="getHasUser"
        :total="total"
        :disabled="listLoading" />
    </el-card>
    <!-- 抽屉结构、 添加或修改用户信息 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ `${drawerTitle}用户` }}</h4>
      </template>
      <template #default>
        <el-form ref="formRef" :model="userParams" :rules="rules">
          <el-form-item label="用户姓名" prop="username">
            <el-input
              v-model="userParams.username"
              placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input
              v-model="userParams.name"
              placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item
            v-if="drawerTitle === '新增'"
            label="用户密码"
            prop="password">
            <el-input
              v-model="userParams.password"
              placeholder="请输入用户密码"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 抽屉结构，分配角色 -->
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form :model="userParams" :inline="true">
          <el-form-item label="用户姓名" prpo="username">
            <el-input
              v-model="userParams.username"
              disabled
              placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange">
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckedCitiesChange">
              <el-checkbox v-for="role in allRole" :key="role.id" :label="role">
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqUserInfo,
  reqAddOrUpdateUserInfo,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqRemoveUserList,
} from "@/api/acl/user";
import {
  UserResponseData,
  Records,
  User,
  AllRoleResponseData,
  AllRole,
  SetRoleData,
  RoleData,
} from "@/api/acl/user/type";
import useLayoutSettingStore from "@/store/modules/setting";
import { ElMessage } from "element-plus";
import { nextTick, onMounted, reactive, ref } from "vue";

const listLoading = ref<boolean>(false);
const pageSizes = ref<number[]>([5, 10, 20, 30, 40]); // 表格分页，每夜条数筛选
let page = ref<number>(1); // 查询数据页码
let limit = ref<number>(5); // 查询每页条数
let total = ref<number>(0); // 表格数据总数
let userArr = ref<Records>(); // 存储全部用户数据
let drawer = ref<boolean>(false); // 控制 drawer （添加\修改用户） 显示或隐藏
let drawerTitle = ref<string>(""); // 抽屉显示的头部标题
let drawer1 = ref<boolean>(false); // 控制 drawer1 (分配角色) 显示或隐藏
// 收集用户信息所需响应式数据
let userParams = reactive<User>({
  username: "",
  name: "",
  password: "",
});
let formRef = ref<any>(); // 获取表单 ref 对象
let keyword = ref<string>(""); // 用户输入关键字
let checkAll = ref<boolean>(false); // 复选框是否全选
let isIndeterminate = ref(true); // 控制全选不确定样式
let allRole = ref<AllRole>([]); // 所有角色列表
let userRole = ref<AllRole>([]); // 已经选择的角色列表
let selectIdArr = ref<User[]>([]); // 表格复选框选中的数据
let settingStore = useLayoutSettingStore(); //获取模板setting仓库

// 检验 username 的回调函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
  // 名称长度至少五位
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("用户名字长度至少五位"));
  }
};
// 检验 name 的回调函数
const validatorName = (rule: any, value: any, callBack: any) => {
  // 名称长度至少五位
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("用户昵称长度至少五位"));
  }
};
// 检验 password 的回调函数
const validatorPassword = (rule: any, value: any, callBack: any) => {
  // 名称长度至少五位
  if (value.trim().length >= 6) {
    callBack();
  } else {
    callBack(new Error("用户密码长度至少六位"));
  }
};
// 表单检验规则对象
let rules = {
  username: [{ required: true, trigger: blur, validator: validatorUsername }],
  name: [{ required: true, trigger: blur, validator: validatorName }],
  password: [{ required: true, trigger: blur, validator: validatorPassword }],
};

onMounted(() => {
  getHasUser();
});

// 获取已有用户账号信息
const getHasUser = async () => {
  listLoading.value = true;
  let result: UserResponseData = await reqUserInfo(
    page.value,
    limit.value,
    keyword.value
  );
  if (result.code === 200) {
    total.value = result.data.total;
    userArr.value = result.data.records;
    listLoading.value = false;
  }
};

// 修改或编辑用户按钮回调
const addOrEditUser = async (row: User) => {
  Object.assign(userParams, {
    username: "",
    name: "",
    password: "",
  });
  if (!row.id) {
    drawerTitle.value = "新增";
  } else {
    drawerTitle.value = "编辑";
    Object.assign(userParams, row);
  }
  drawer.value = true;
  nextTick(() => {
    formRef.value.clearValidate();
  });
};

// 抽屉取消按钮
const cancelClick = () => {
  drawer.value = false;
  drawer1.value = false;
};

//保存按钮的回调
const save = async () => {
  //点击保存按钮的时候,务必需要保证表单全部复合条件在去发请求
  await formRef.value.validate();
  //保存按钮:添加新的用户|更新已有的用户账号信息
  let result: any = await reqAddOrUpdateUserInfo(userParams);
  if (result.code === 200) {
    ElMessage.success(`${drawerTitle.value}用户成功`);
    window.location.reload(); // 浏览器刷新，若修改当前登陆账号，直接重定向至登录页
  } else {
    ElMessage.error(`${drawerTitle.value}用户失败`);
  }
  drawer.value = false;
};

// 分配角色按钮回调
const setRole = async (row: User) => {
  Object.assign(userParams, row);
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number);
  if (result.code === 200) {
    allRole.value = result.data.allRolesList;
    userRole.value = result.data.assignRoles;
    isIndeterminate.value = result.data.assignRoles.length > 0;
    drawer1.value = true;
  } else {
    ElMessage.error("获取全部角色失败，请检查网络环境重新获取");
  }
};

// 全选复选框状态改变回调
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : [];
  isIndeterminate.value = false;
};

// 角色复选框组改变回调
const handleCheckedCitiesChange = (val: AllRole) => {
  const checkedCount = val.length;
  checkAll.value = checkedCount === allRole.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length;
};

// 确认角色分配
const confirmClick = async () => {
  let params: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => {
      return item.id as number;
    }),
  };
  let result: any = await reqSetUserRole(params);
  if (result.code === 200) {
    ElMessage.success("分配角色成功");
    drawer1.value = false;
    window.location.reload();
  } else {
    ElMessage.error("分配角色失败");
  }
};

// 删除用户回调
const deleteUser = async (row: RoleData) => {
  let result: any = await reqRemoveUser(row.id as number);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getHasUser();
  } else {
    ElMessage.error("删除失败");
  }
};

// 表格复选框勾选回调
const selectChange = (val: any) => {
  selectIdArr.value = val;
};

// 批量删除按钮回调
const deleteSelectUser = async () => {
  // 处理接口所需参数
  let idList: number[] = selectIdArr.value.map((item) => item.id as number);
  let result: any = await reqRemoveUserList(idList);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getHasUser();
  } else {
    ElMessage.error("删除失败");
  }
};

// 搜索按钮回调
const search = () => {
  getHasUser();
  keyword.value = "";
};

// 重置按钮
const reset = () => {
  settingStore.refsh = !settingStore.refsh;
};
</script>

<style lang="scss" scoped>
.form_card {
  height: 80px;
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.pagemain_card {
  margin: 10px 0;
}
</style>
