<template>
  <div>
    <div class="content-header">
      <h1>预约管理<small>检查组管理</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>预约管理</el-breadcrumb-item>
        <el-breadcrumb-item>检查组管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="app-container">
      <div class="box">
        <div class="filter-container">
          <el-input placeholder="编码/名称/助记码" v-model="pagination.queryString" style="width: 200px;" class="filter-item"
                    @keyup.enter.native="handleFilter"></el-input>
          <el-button @click="findPageByCondition" class="dalfBut">查询</el-button>
          <el-button type="primary" class="butT" @click="handleCreate()">新建</el-button>
        </div>
        <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>
          <el-table-column type="index" align="center" label="序号"></el-table-column>
          <el-table-column prop="code" label="检查组编码" align="center"></el-table-column>
          <el-table-column prop="name" label="检查组名称" align="center"></el-table-column>
          <el-table-column label="适用性别" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sex == '0' ? '不限' : scope.row.sex == '1' ? '男' : '女' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="helpCode" label="助记码" align="center"></el-table-column>
          <el-table-column prop="remark" label="说明" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
              class="pagiantion"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-size="pagination.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="pagination.total">
          </el-pagination>
        </div>
        <!-- 新增标签弹层 -->
        <div class="add-form">
          <el-dialog title="新增检查组" :visible.sync="dialogFormVisible">
            <template>
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="基本信息" name="first">
                  <el-form :model="formData" ref="dataAddForm" label-position="right" label-width="100px"
                           :rules="rules">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="编码" prop="code">
                          <el-input v-model="formData.code"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="名称" prop="name">
                          <el-input v-model="formData.name"/>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="适用性别">
                          <el-select v-model="formData.sex">
                            <el-option label="不限" value="0"></el-option>
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="2"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="助记码">
                          <el-input v-model="formData.helpCode"/>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="说明">
                          <el-input v-model="formData.remark" type="textarea"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="注意事项">
                          <el-input v-model="formData.attention" type="textarea"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="检查项信息" name="second">
                  <div class="checkScrol">
                    <table class="datatable">
                      <thead>
                      <tr>
                        <th>选择</th>
                        <th>项目编码</th>
                        <th>项目名称</th>
                        <th>项目说明</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="c in tableData" :key="c.id">
                        <td>
                          <input :id="c.id" v-model="checkitemIds" type="checkbox" :value="c.id">
                        </td>
                        <td><label :for="c.id">{{ c.code }}</label></td>
                        <td><label :for="c.id">{{ c.name }}</label></td>
                        <td><label :for="c.id">{{ c.remark }}</label></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </template>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="handleAdd('dataAddForm')">确定</el-button>
            </div>
          </el-dialog>
        </div>

        <!-- 编辑标签弹层 -->
        <div class="add-form">
          <el-dialog title="编辑检查组" :visible.sync="dialogFormVisible4Edit">
            <template>
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="基本信息" name="first">
                  <el-form :model="formData" ref="dataEditForm" :rules="rules" label-position="right"
                           label-width="100px">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="编码" prop="code">
                          <el-input v-model="formData.code"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="名称" prop="name">
                          <el-input v-model="formData.name"/>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="适用性别">
                          <el-select v-model="formData.sex">
                            <el-option label="不限" value="0"></el-option>
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="2"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="助记码">
                          <el-input v-model="formData.helpCode"/>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="说明">
                          <el-input v-model="formData.remark" type="textarea"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="注意事项">
                          <el-input v-model="formData.attention" type="textarea"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="检查项信息" name="second">
                  <div class="checkScrol">
                    <table class="datatable">
                      <thead>
                      <tr>
                        <th>选择</th>
                        <th>项目编码</th>
                        <th>项目名称</th>
                        <th>项目说明</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="c in tableData" :key="c.id">
                        <td>
                          <input :id="c.id" v-model="checkitemIds" type="checkbox" :value="c.id">
                        </td>
                        <td><label :for="c.id">{{ c.code }}</label></td>
                        <td><label :for="c.id">{{ c.name }}</label></td>
                        <td><label :for="c.id">{{ c.remark }}</label></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </template>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible4Edit = false">取消</el-button>
              <el-button type="primary" @click="handleEdit('dataEditForm')">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {findAllCheckItem, saveOrUpdate, findPage, deleteCheckGroup, findCheckGroupInfo} from "@/api/checkgroup";

export default {
  data() {
    return {
      activeName: 'first',//添加/编辑窗口Tab标签名称
      pagination: {//分页相关属性
        currentPage: 1,
        pageSize: 10,
        total: 100,
        queryString: null,
      },
      dataList: [],//列表数据
      formData: {},//表单数据
      tableData: [],//新增和编辑表单中对应的检查项列表数据
      checkitemIds: [],//新增和编辑表单中检查项对应的复选框，基于双向绑定可以进行回显和数据提交
      dialogFormVisible: false,//控制添加窗口显示/隐藏
      dialogFormVisible4Edit: false,//控制编辑窗口显示/隐藏
      rules: {//校验规则
        code: [
          {required: true, message: '项目编码为必填项', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '项目名称为必填项', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'blur'}
        ]
      }
    };
  },

  created() {
    this.findAllCheckItem()
    this.findPageByGroup()
  },
  methods: {
    async handleDelete(row) {
      //删除后重新分页查询
      //   console.log(row);
      let res = await deleteCheckGroup(row.id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (res.flag) {
          this.$message.success("删除成功");
          this.pagination.currentPage = 1;
          this.findPageByGroup();
        }
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
    },
    async handleUpdate(row) {
      this.dialogFormVisible4Edit = true;
      let json = JSON.stringify(row);
      this.formData = JSON.parse(json);
      let res = await findCheckGroupInfo(row.id);
      if (res.flag) {
        this.tableData = res.data.checkItems
        this.checkitemIds = res.data.checkItemIds
        this.$message.success('数据回显成功')
      } else {
        this.$message.error(res.message)
      }
    },
    handleReset() {
      this.formData = {};
      this.checkitemIds = [];
      this.activeName = 'first';
    },
    handleCreate() {
      // 每次点击新键按钮，重置表单数据
      this.handleReset()
      // 显示表单窗口
      this.dialogFormVisible = true;
      // 查询所有的检查项目
      this.findAllCheckItem()
    },
    handleEdit(roleForm) {
      this.handleAdd(roleForm);
    },
    handleAdd(ruleForm) {
      // console.log(ruleForm); 校验表单数据是否合法
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (this.checkitemIds.length === 0) {
            this.$message.warning('至少选择一项!');
            this.activeName = 'second';
            return;
          } else {
            this.formData.checkitemIds = this.checkitemIds;
            // 调用接口实现新增操作
            this.saveOrUpdateGroup(this.formData);
          }

          // 隐藏窗口
          this.dialogFormVisible = false;
          this.dialogFormVisible4Edit = false;
        } else {
          this.$message.error("表单校验非法");
        }
      });
    },
    findPageByCondition() {
      this.pagination.currentPage = 1
      this.findPageByGroup()
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage
      this.findPageByGroup()
    },
    async findPageByGroup() {
      let res = await findPage(this.pagination);
      // console.log(res);
      if (res.flag) {
        this.dataList = res.data.rows;
        this.pagination.total = res.data.total;
      } else {
        this.$message.error(res.message);
      }
    },
    async findAllCheckItem() {
      let res = await findAllCheckItem();
      this.tableData = res.data
    },
    async saveOrUpdateGroup(formData) {
      let res = await saveOrUpdate(formData);
      if (res.flag) this.$message.success("数据录入成功");
      else this.$message.error(res.message);
      this.findPageByGroup();
    }
  }


};
</script>

<style scoped>
.datatable {
  position: relative;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  width: 100%;
  max-width: 100%;
  font-size: 14px;
  color: rgb(96, 98, 102);
  overflow: hidden;
  flex: 1 1 0%;
}

.datatable td,
.datatable th {
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
</style>
