<template>
  <div>
    <el-card class="box-card">
      <!-- 品牌按钮 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addorEditTrademark"
        >添加品牌</el-button
      >
      <!-- 表格组件，展示已经存在的品牌-列表 -->
      <el-table style="margin: 10px 0" border :data="trademarkArr">
        <el-table-column label="序号" width="120" align="center" type="index">
        </el-table-column>
        <el-table-column
          label="品牌名称"
          align="center"
          prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO" align="center">
          <template #="{ row }">
            <img
              v-if="!row.logoUrl.includes('http://')"
              :src="'http://' + row.logoUrl"
              width="100" />
            <img v-else :src="row.logoUrl" width="100" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="addorEditTrademark(row)"></el-button>
            <el-popconfirm
              :title="`请问您是否确认删除(${row.tmName})?`"
              icon="Delete"
              width="260px"
              @confirm="removeTrademark(row)">
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-model:page="page"
        v-model:limit="limit"
        :total="total"
        :updateData="getHasTrademark"
        :disabled="listLoading" />
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="title + '品牌'"
      @close="close">
      <el-form
        ref="trademarkParamsRef"
        :model="trademarkParams"
        :rules="rules"
        style="width: 80%">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请您输入品牌名称"
            v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            :action="fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">Cancel</el-button>
          <el-button type="primary" @click="confirm(trademarkParamsRef)">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { fileUpload } from "@/api";
import {
  reqHasTrademark,
  reqAddorEditTrademark,
  reqDeleteTrademark,
} from "@/api/product/trademark";
import type {
  Records,
  Trademark,
  TrademarkResponseData,
} from "@/api/product/trademark/type";
import {
  ElMessage,
  FormInstance,
  FormRules,
  type UploadProps,
} from "element-plus";

const listLoading = ref<boolean>(false);
let trademarkParamsRef = ref<FormInstance>();
let page = ref<number>(1); // 查询数据页码
let limit = ref<number>(3); // 查询每页条数
let total = ref<number>(0); // 表格数据总数
let trademarkArr = ref<Records>(); // 表格数据
let dialogFormVisible = ref<boolean>(false); // 控制对话框显示隐藏
let title = ref<string>(""); // 对话框标题
// 新增 || 编辑表单，收集数据
let trademarkParams = reactive<Trademark>({
  tmName: "",
  logoUrl: "",
});
const rules = reactive<FormRules<Trademark>>({
  tmName: [{ required: true, message: "请填写品牌名称", trigger: "blur" }],
  logoUrl: [{ required: true, message: "请上传图片", trigger: "change" }],
});

onMounted(() => {
  getHasTrademark();
});

// 获取品牌表格信息
const getHasTrademark = async () => {
  listLoading.value = true;
  let result: TrademarkResponseData = await reqHasTrademark(
    page.value,
    limit.value
  );
  if (result.code === 200) {
    listLoading.value = false;
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};

// 添加 || 编辑按钮
const addorEditTrademark = (row: Trademark) => {
  title.value = row.id ? "编辑" : "添加";
  dialogFormVisible.value = true;
  if (row.id) {
    Object.assign(trademarkParams, row);
  }
};

// 弹窗图片上传校验
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type === "image/jpeg" ||
    rawFile.type === "image/png" ||
    rawFile.type === "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage.error("上传大小必须小于4MB!");
      return false;
    }
  } else {
    ElMessage.error("上传文件格式必须JPG|PNG|GIF");
    return false;
  }
};

// 弹窗图片上传成功回调
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  // response 上传图片后，post请求服务器返回的响应数据
  trademarkParams.logoUrl = response.data;
};

// 弹窗确认按钮
const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      let result: any = await reqAddorEditTrademark(trademarkParams);
      if (result.code === 200) {
        dialogFormVisible.value = false;
        ElMessage.success(`${title.value}品牌成功`);
        getHasTrademark();
      } else {
        dialogFormVisible.value = false;
        ElMessage.error(`${title.value}品牌失败`);
      }
    }
  });
};

// 弹窗取消按钮
const cancel = () => {
  dialogFormVisible.value = false;
};

// 删除品牌数据
const removeTrademark = async (row: Trademark) => {
  if (row.id) {
    let result = await reqDeleteTrademark(row.id);
    if (result.code === 200) {
      ElMessage.success(`删除(${row.tmName})成功`);
      getHasTrademark();
    } else {
      ElMessage.error(`删除(${row.tmName})失败`);
    }
  } else {
    ElMessage.warning("请确认您要删除的品牌ID");
  }
};

// 表单重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 弹窗关闭的回调
const close = () => {
  resetForm(trademarkParamsRef.value);
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
