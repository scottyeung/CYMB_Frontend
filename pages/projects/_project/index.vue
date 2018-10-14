<template>
</template>

<script>
export default {
  name: "Index",
  fetch ({ params, redirect }) {
    redirect(301, '/projects/' + params.project + '/overview')
  }
}
</script>
