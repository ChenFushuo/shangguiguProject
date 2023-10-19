<template>
  <div>
    <el-card class="form_card">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default">搜索</el-button>
          <el-button type="primary" size="default">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="pagemain_card">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addOrEditUser">
        添加用户
      </el-button>
      <el-button type="primary" size="default" icon="Delete">
        批量删除
      </el-button>
      <!-- table展示用户信息 -->
      <el-table :data="userArr" border style="margin: 10px 0">
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
            <el-button type="primary" size="small" icon="User">
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="addOrEditUser(row)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" icon="Delete">
              删除
            </el-button>
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
  </div>
</template>

<script setup lang="ts">
import { reqUserInfo, reqAddOrUpdateUserInfo } from "@/api/acl/user";
import { UserResponseData, Records, User } from "@/api/acl/user/type";
import { ElMessage, FormInstance } from "element-plus";
import { nextTick, onMounted, reactive, ref } from "vue";

const listLoading = ref<boolean>(false);
let page = ref<number>(1); // 查询数据页码
let limit = ref<number>(5); // 查询每页条数
let pageSizes = ref<number[]>([5, 10, 20, 30, 40]); // 表格分页，每夜条数筛选
let total = ref<number>(0); // 表格数据总数
let userArr = ref<Records>(); // 存储全部用户数据
let drawer = ref<boolean>(false); // 控制 drawer 显示或隐藏
let drawerTitle = ref<string>(""); // 抽屉显示的头部标题
// 收集用户信息所需响应式数据
let userParams = reactive<User>({
  username: "",
  name: "",
  password: "",
});
let formRef = ref<any>(); // 获取表单 ref 对象
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
  let result: UserResponseData = await reqUserInfo(page.value, limit.value);
  if (result.code === 200) {
    total.value = result.data.total;
    userArr.value = result.data.records;
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
};

// 抽屉确认按钮
// const save = async () => {
//   await formRef.value.validate();
//   let result: any = await reqAddOrUpdateUserInfo(userParams);
//   if (result.code === 200) {
//     ElMessage.success(`${drawerTitle.value}用户成功`);
//     getHasUser();
//   } else {
//     ElMessage.success(`${drawerTitle.value}用户失败`);
//   }
//   drawer.value = false;
// };
//保存按钮的回调
const save = async () => {
  //点击保存按钮的时候,务必需要保证表单全部复合条件在去发请求
  await formRef.value.validate();
  //保存按钮:添加新的用户|更新已有的用户账号信息
  let result: any = await reqAddOrUpdateUserInfo(userParams);
  if (result.code === 200) {
    ElMessage.success(`${drawerTitle.value}用户成功`);
    getHasUser();
  } else {
    ElMessage.success(`${drawerTitle.value}用户失败`);
  }
  drawer.value = false;
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
