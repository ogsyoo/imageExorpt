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
        <el-table-column prop="name" label="名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detail(scope.row.id)">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.created_time }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="primary" size="mini" round @click="clickUpdate(scope.row.id)">编辑  下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;text-align: left;margin-left: 60px;">
        <el-button type="danger" round @click="toggleSelection([tableData[1], tableData[2]])">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import services from "@/services"
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    clickUpdate(id){
        this.$router.push("/updatejob/"+id);
    },
    getList() {
      var url = services.api+"/export/project/list";
      this.$http
        .get(url)
        .then(response => {
          console.log(response);
          if (response.body.success == 1 || response.status != 200) {
            console.log(response.data);
            this.tableData = response.data.data;
          } else {
            console.log(response);
          }
        })
        .catch(function(response) {
          console.log(response.body.errMsg);
        });
    },
    detail(pid) {
      this.$router.push("/detail/" + pid);
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