<template>
  <div>
    <div style="margin:20px;padding:20px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="path" label="镜像地址"></el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.created_time }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="clickUpdate(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delImage(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
        <el-form :model="image">
          <el-form-item label="镜像名称" :label-width="formLabelWidth">
            <el-input v-model="image.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="推送地址" :label-width="formLabelWidth">
            <el-input v-model="image.path" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="镜像描述" :label-width="formLabelWidth">
            <el-input v-model="image.describe" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align:right">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateImage()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- <el-dialog title="提示" :visible.sync="dialogTableVisible" width="30%">
        <span>{{ gridData }}</span>
      </el-dialog>-->
    </div>
  </div>
</template>

<script>
import services from "@/services";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      centerDialogVisible: false,
      dialogTableVisible: false,
      gridData: "",
      image: {
        name: "",
        path: "",
        describe: "",
        id: ""
      },
      formLabelWidth: "70px"
    };
  },
  mounted() {
    this.getImageList();
  },
  methods: {
    getImageList() {
      var url =
        services.api + "/project/images/" + this.$route.params.pid;
      this.$http
        .get(url)
        .then(response => {
          if (response.body.success == 1) {
            console.log();
            if (response.body.data.images.length > 0) {
              this.tableData = response.body.data.images;
            }
          } else {
            console.log(response);
          }
        })
        .catch(function(response) {
          alert(response.body.errMsg);
        });
    },
    clickUpdate(row) {
      this.centerDialogVisible = true;
      console.log(row);
      this.image.name = row.name;
      this.image.describe = row.describe;
      this.image.path = row.path;
      this.image.id = row.id;
    },
    updateImage() {
      var url = services.api + "/image";
      this.$http
        .put(url, this.image)
        .then(response => {
          console.log(response);
          if (response.body.success == 1 || response.status != 200) {
            this.centerDialogVisible = false;
            this.gridData = "操作成功";
            this.tableData = response.data.data;
          } else {
            this.centerDialogVisible = false;
            console.log(response);
          }
        })
        .catch(function(response) {
          this.centerDialogVisible = false;
          alert(response.body.errMsg);
        });
    },
    delImage(id) {
      var url = services.api + "/image/" + id;
      this.$http
        .delete(url, this.image)
        .then(response => {
          console.log(response);
          if (response.body.success == 1 || response.status != 200) {
            this.getImageList();
          } else {
            this.dialogTableVisible = true;
            this.gridData = "操作失败";
            console.log(response);
          }
        })
        .catch(function(response) {
          this.dialogTableVisible = true;
          this.gridData = "操作失败";
          alert(response.body.errMsg);
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style>
.dialog-footer {
  text-align: right;
}
</style>
