<template>
  <div style="margin:10px 50px 15px 50px;">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      style="width: 100%;margin:0px"
      class="demo-ruleForm"
    >
      <el-form-item label="项目名称：" prop="projectname" style="text-align:left">
        <el-input v-model="ruleForm.projectname" style="width:50%;float:left;"></el-input>
      </el-form-item>
      <el-form-item label="项目描述：" prop="describe" style="text-align:left">
        <el-input v-model="ruleForm.describe" style="width:50%;float:left;"></el-input>
        <el-button
          type="primary"
          class="el-icon-plus"
          @click.prevent="addRow()"
          style="width:5%;float:right;margin-left:15px"
        ></el-button>
        <el-button
          type="danger"
          class="el-icon-minus"
          @click.prevent="delData()"
          style="width:5%;float:right;margin-left:15px"
        ></el-button>
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
        <el-table-column label="镜像名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.describe"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="版本号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.version"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-form-item style="width:20%"> -->
      <el-button type="primary" @click="submitForm()" style="margin-top:25px">立即创建</el-button>
      <!-- <el-button @click="resetForm('ruleForm')" >重置</el-button> -->
      <!-- </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      selectlistRow: [],
      ruleForm: {
        projectname: "",
        describe: "",
      }
    };
  },
  methods: {
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val;
    },
    // 增加行
    addRow() {
      var list = {
        rowNum: this.tableData.length + 1,
        name: "",
        describe: "",
        version: "",
        path:""
      };
      console.log(list);
      this.tableData.push(list);
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
    submitForm() {
      var project_iamges = {
        project: {
          name: this.ruleForm.projectname,
          describe: this.ruleForm.describe
        },
        images: this.tableData
      };
      console.log(project_iamges);
      var url = "http://localhost:8081/export/project";
      this.$http
        .post(url, project_iamges)
        .then(response => {
          console.log(response);
          if (response.body.success == 1 || response.status != 200) {
            alert(response.body.data);
          } else {
            alert(response.body.errMsg);
          }
        })
        .catch(function(response) {
          alert(response.body.errMsg);
        });
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //       alert("submit!");
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
    }
  }
};
</script>