<template>
  <q-card class="no-shadow" bordered>
    <q-card-section class="q-pa-md">
      <div class="text-h6 text-grey-8">
        <q-btn @click="addExpense()" label="ADD DESPESA" color="dark"/>
      </div>
      <q-table title="Despesas" :data="data" :columns="columns" row-key="name" class="no-shadow">
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
<!--            <q-btn @click="editExpense(props.row.id)" icon="edit" size="sm" flat dense/>-->
            <router-link  :to="'/expenses/'+props.row.id"><q-btn icon="edit" size="sm" flat dense/></router-link>
            <q-btn @click="deleteExpense(props.row.id)" icon="delete" size="sm" class="q-ml-sm" flat dense/>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>


<script>
import { compareAsc, format } from 'date-fns'

export default {
  name: "List",
  created() {
    this.loadExpenses()
  },

  data() {
    return {
      columns: [
        {name: 'description', label: 'Descrição', field: 'description', align: 'left'},
        {name: 'date', label: 'Data', field: 'date', align: 'left'},
        {name: 'price', label: 'Preço', field: 'price', align: 'left'},
        {name: 'Action', label: '', field: 'Action', align: 'center'}
      ],
      data : []
    };
  },
  methods: {
    loadExpenses() {
      const response = this.$axios.get("/expenses/getAll")
        .then(response => {
          this.data = response.data.map((item)=> {
            return {
              ...item,
              date: format(new Date(item.date), 'dd/MM/Y'),
              price: 'R$'+item.price
                .toFixed(2) // casas decimais
                .replace('.', ',')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }
          })

        })
      .catch(errors => {
        console.log(errors)
      });
    },
    deleteExpense(id){
      const response = this.$axios.delete("/expenses/"+id);

      const expenses = this.data.filter((item)=> item.id != id)
      this.data = expenses
    },
    editExpense(id){
      this.$router.push("/expenses/"+id)
    },
    addExpense(){
      this.$router.push("/expenses/create")
    }
  },
};
</script>
<style scoped>
.text-h6{
  margin-bottom: 30px;
}
</style>
