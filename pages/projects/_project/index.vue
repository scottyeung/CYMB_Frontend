<script>
  export default {
    name: "Project",
    fetch ({ params, redirect }) {
      redirect(301, '/projects/' + params.project + '/overview')
    }
  }
</script>
