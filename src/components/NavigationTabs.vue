<template>
  <Tabs value="nomina">
    <TabList>
      <Tab value="nomina">Nómina</Tab>
      <Tab value="horas_extras">Horas Extras</Tab>
      <Tab value="regalia_pascual">Regalía Pascual</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="nomina">
        <NominaCalculator />
      </TabPanel>
      <TabPanel value="horas_extras">
        Horas Extras
      </TabPanel>
      <TabPanel value="regalia_pascual">
        Regalía Pascual
      </TabPanel>
    </TabPanels>
  </Tabs>

</template>
<script setup lang="ts">
import Tab from "primevue/tab";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import NominaCalculator from "@/components/NominaCalculator.vue"
</script>