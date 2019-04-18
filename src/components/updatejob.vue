<template>
  <div style="margin:10px 50px 15px 50px;">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      style="width: 100%;margin:0px"
      class="demo-ruleForm"
    >
      <el-form-item label="项目名称：" prop="name" style="text-align:left">
        <el-input v-model="ruleForm.name" style="width:50%;float:left;"></el-input>
      </el-form-item>
      <el-form-item label="下载地址：" prop="registry" style="text-align:left">
        <el-input v-model="ruleForm.registry" style="width:50%;float:left;"></el-input>
      </el-form-item>
      <el-form-item label="推送地址：" prop="push" style="text-align:left">
        <el-input v-model="ruleForm.push" style="width:50%;float:left;"></el-input>
      </el-form-item>
      <el-form-item label="项目描述：" prop="describe" style="text-align:left">
        <el-input v-model="ruleForm.describe" style="width:50%;float:left;"></el-input>
        <el-button
          type="primary"
          @click.prevent="addRow()"
          style="width:5%;float:right;margin-left:15px"
        >新增行</el-button>
        <el-button
          type="danger"
          @click.prevent="addRow()"
          style="width:8%;float:right;margin-left:15px"
        >批量删除</el-button>
        <el-button
          type="primary"
          @click.prevent="clickPackage()"
          style="width:8%;float:right;margin-left:15px"
        >批量打包</el-button>
        <el-button
          type="success"
          @click.prevent="addRow()"
          style="width:8%;float:right;margin-left:15px"
        >推送私有库</el-button>
      </el-form-item>
      <el-table
        :data="tableData"
        ref="table"
        tooltip-effect="dark"
        border
        stripe
        @selection-change="selectRow"
      >
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column label="仓库地址" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.path"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="推送地址" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.push"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="镜像名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="版本号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.version"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.describe"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="clickPackage(scope.row)"
              v-bind:disabled="scope.row.package_click"
            >
              打包
              <i class="el-icon-loading" v-show="scope.row.package_click" style="width:25px"></i>
            </el-button>
            <el-button size="mini" type="danger" @click="delRow(scope.row.id)">删除</el-button>
            <el-button size="mini" type="primary" @click="submitForm(scope.row)">保存</el-button>
            <el-button size="mini" type="primary" @click="clickUpdate(scope.row.id)">推送</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import services from "@/services";
export default {
  data() {
    return {
      packageButShow: false,
      tableData: [],
      selectlistRow: [],
      ruleForm: {
        name: "",
        describe: "",
        registry: "",
        push: ""
      }
    };
  },
  mounted() {
    this.init();
    this.getProjectList();
  },
  methods: {
    errorPackage(msg) {
      this.$notify({
        title: "结果",
        message: msg,
        position: "bottom-right"
      });
    },
    init() {
      var e1 = new EventSource(services.api + "/sse/event/images_package");
      var _self = this;
      e1.onmessage = function(event) {
        var msg = JSON.parse(event.data);
        console.log(msg);
        _self.tableData.forEach(v => {
          if (v.id == msg.id) {
            if (msg.status == "success") {
              v.package_click = false;
              _self.errorPackage("镜像 " + msg.name + "  打包成功!");
            } else if (msg.status == "err") {
              v.package_click = false;
              _self.errorPackage("打包失败,请检查镜像地址信息!");
            } else {
            }
          }
        });
      };
    },
    //打包
    clickPackage(row) {
      row.package_click = true;
      var arr = [];
      if (row) {
        arr.push(row);
      } else {
        arr = this.selectlistRow;
      }
      console.log(arr);
      var url = services.api + "/image/package";
      this.$http
        .post(url, arr)
        .then(response => {})
        .catch(function(response) {
          console.log(response.body.errMsg);
        });
    },
    //获取数据
    getProjectList() {
      var url = services.api + "/project/images/" + this.$route.params.id;
      this.$http
        .get(url)
        .then(response => {
          console.log(response.body);
          if (response.body.success == 1) {
            this.ruleForm = response.body.data.project;
            console.log("ruleForm", this.ruleForm);
            if (response.body.data.images.length > 0) {
              // response.body.data.images.forEach(function(value, i) {
              //   value.path =
              //     response.body.data.project.registry +
              //     "/" +
              //     value.name +
              //     ":" +
              //     value.version;
              // });
              response.body.data.images.forEach(e => {
                e.package_click = false;
              });
              this.tableData = response.body.data.images;
              console.log(this.tableData);
            }
          } else {
            console.log(response);
          }
        })
        .catch(function(response) {
          console.log(response.body.errMsg);
        });
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val;
    },
    // 增加行
    addRow() {
      var list = {
        rowNum: this.tableData.length + 1,
        path: this.ruleForm.registry,
        push: this.ruleForm.push,
        name: "",
        describe: "",
        version: "",
        package_click: false
      };
      console.log(list);
      this.tableData.push(list);
    },
    delRow(id) {
      var url = services.api + "/image/" + id;
      this.$http
        .delete(url)
        .then(response => {
          alert("删除成功")
        })
        .catch(function(response) {
          console.log(response.body.errMsg);
        });
    },
    // 删除方法
    // 删除选中行
    delData() {
      if (this.selectlistRow.length == 0) {
        this.tableData.shift();
      }
      for (let i = 0; i < this.selectlistRow.length; i++) {
        let val = this.selectlistRow;
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.tableData.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
              // i 为选中的索引
              this.tableData.splice(i, 1);
            }
          });
        });
      }
      // 删除完数据之后清除勾选框
      this.$refs.tableData.clearSelection();
    },
    submitForm(row) {
      var project_iamges = {
        project: {
          id: this.ruleForm.id,
          name: this.ruleForm.projectname,
          describe: this.ruleForm.describe,
          registry: this.ruleForm.registry
        },
        images: []
      };
      project_iamges.images.push(row);
      var url = services.api + "/project";
      this.$http
        .post(url, project_iamges)
        .then(response => {
          console.log(response);
          if (response.body.success == 1 || response.status != 200) {
            console.log(response.body.data);
          } else {
            console.log(response.body.errMsg);
          }
        })
        .catch(function(response) {
          console.log(response.body.errMsg);
        });
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //       console.log("submit!");
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
    }
  }
};
</script>