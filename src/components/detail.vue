<template>
  <div>
    <div style="margin:20px;border:1px solid #E4E7ED;padding:20px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
            >{{ scope.row.address }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;text-align: left;margin-left: 60px;">
        <el-button type="danger" round @click="toggleSelection([tableData[1], tableData[2]])">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "高士尧",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "高士尧",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "高士尧",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "高士尧",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "高士尧",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "高士尧",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "高士尧",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
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