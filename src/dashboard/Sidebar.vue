<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img
        src="../assets/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="../assets/img/avatar5.png"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
          <a v-if="toShow" href="#" class="d-block">{{ username }}</a>
        </div>
      </div>

      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  name: "SideBar",

  data() {
    return {
      username: "",
      toShow: false,
    };
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (user) {
      this.username = JSON.parse(user).name;
      this.toShow = true;
    } else {
      this.$router.push({ name: "Login" });
      return;
    }
  },
};
</script>

<style></style>
