<template>
  <div>
    <SearchArea />
    <LastVisitedArea />
  </div>
</template>

<script>
import LastVisitedArea from "@/components/LastVisitedArea.vue";
import SearchArea from "@/components/SearchArea.vue";

export default {
  name: "Home",
  components: {
    SearchArea,
    LastVisitedArea,
  },
};
</script>
