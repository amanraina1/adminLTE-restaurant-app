<template>
  <!-- Content Header (Page header) -->
  <!-- <div class="content-header d-flex" v-if="toShow"> -->
  <!-- <div class="container-fluid"> -->
  <!-- <div class="row mb-2"> -->
  <!-- <div class="col-sm-6"> -->
  <!-- <h1 class="m-0">Hi {{ username }}</h1> -->
  <!-- </div> -->
  <!-- /.col -->
  <!-- <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active">
              <a href="/add">Add restaurant</a>
            </li>
          </ol>
        </div> -->
  <!-- /.col -->
  <!-- </div> -->
  <!-- /.row -->
  <!-- </div> -->
  <!-- /.container-fluid -->
  <!-- </div> -->
  <!-- /.content-header -->
</template>

<script>
export default {
  data() {
    return {
      username: "",
      toShow: false,
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.username = JSON.parse(user).name;
      this.toShow = true;
    }
  },
};
</script>

<style></style>
