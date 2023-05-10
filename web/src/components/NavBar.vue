<template>
  <!-- <nav class="navbar navbar-expand-lg bg-body-tertiary"></nav>顶部透明色主题的导航栏写法 -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">    <!--  顶部白色主题的导航栏写法，把两处的dark都换成light实现深色主题的导航栏 -->
    <div class="container">
      <a class="navbar-brand" href="/">King Of Bots</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/pk/">对战</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/record/">对局列表</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/ranklist/">排行榜</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Aubrey Chen
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><a class="dropdown-item" href="/user/bot">我的Bots</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">退出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

</script>

<!-- <style>后加scoped的作用：在这个里面写的CSS它会加上一个随机字符串，使得这个样式不会影响到组件以外的部分 -->
<style scoped>

</style>
