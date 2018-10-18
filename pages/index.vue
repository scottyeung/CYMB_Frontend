<template>
  <div/>
</template>

<script>
export default {

}
</script>

<style>

</style>


<script>
export default {
  name: "Index",
  fetch ({ params, redirect }) {
    redirect(301, '/projects')
  }
}
</script>
