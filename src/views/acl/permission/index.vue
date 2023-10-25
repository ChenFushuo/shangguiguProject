<template>
  <div>
    <el-table
      :data="permissionArr"
      default-expand-all
      row-key="id"
      border
      class="table">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" prop="address">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 4"
            @click="addOrEditPermission(row, 'add')">
            {{ row.level === 3 ? "添加功能" : "添加菜单" }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 1"
            @click="addOrEditPermission(row, 'edit')">
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定删除（${row.name}）吗?`"
            @confirm="deletePermission(row)"
            width="200px">
            <template #reference>
              <el-button type="danger" size="small" :disabled="row.level === 1">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加、更新已有权限数据的结构 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle + `${permissionParams.level === 3 ? '功能' : '菜单'}`"
      width="30%">
      <el-form :model="permissionParams" :inline="true" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="permissionParams.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="权限值" prop="code">
          <el-input
            v-model="permissionParams.code"
            placeholder="请输入权限值" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrEditPermission,
  reqAllPermission,
  reqRemovePermission,
} from "@/api/acl/menu";
import {
  Permission,
  PermissionList,
  PermissionResponseData,
} from "@/api/acl/menu/type";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";

let permissionArr = ref<PermissionList>([]); // 存储获取到的菜单按钮权限数据
let dialogVisible = ref<boolean>(false); // 控制对话框的显示与隐藏
let dialogTitle = ref<string>(""); // 对话框的标题
// 新增、修改权限时携带的参数
let permissionParams = reactive<Permission>({
  code: "",
  level: "",
  name: "",
  pid: "",
});

onMounted(() => {
  getHasPermission();
});

// 获取所有已有的权限
const getHasPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission();
  if (result.code === 200) {
    permissionArr.value = result.data;
  }
};

// 添加、修改权限数据
const addOrEditPermission = (row: Permission, type: string) => {
  Object.assign(permissionParams, {
    code: "",
    level: "",
    name: "",
    pid: "",
  });
  if (type === "add") {
    dialogTitle.value = "添加";
    permissionParams.pid = row.id as number;
    permissionParams.level = (row.level as number) + 1;
  } else if (type === "edit") {
    Object.assign(permissionParams, row);
    dialogTitle.value = "编辑";
  }
  dialogVisible.value = true;
};

// 确定按钮回调
const save = async () => {
  let result: any = await reqAddOrEditPermission(permissionParams);
  if (result.code === 200) {
    ElMessage.success(`${dialogTitle.value}成功`);
    dialogVisible.value = false;
    getHasPermission();
  } else {
    ElMessage.error(`${dialogTitle.value}失败`);
    dialogVisible.value = false;
  }
};

// 删除权限按钮回调
const deletePermission = async (row: Permission) => {
  let result: any = await reqRemovePermission(row.id as number);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getHasPermission();
  } else {
    ElMessage.error("删除失败");
  }
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  margin-bottom: 20px;
}
</style>
