<template>
    <section class="real-app">
        <input type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下去要做什么"
        @keyup.enter="addTodo"/>
        <Item v-for="todo in filteredTodos" :todo="todo" :key="todo.id"
        @del="deleteTodo"/>
        <Tab :filter="filter" :todos="todos"
        @toggleFilter="toggleFilter"
        @clearAllFinished="clearAllFinished"></Tab>
    </section>
</template>
<script>
    import Item from './item.vue'
    import Tab from './tabs.vue'
    let id = 0
    export default {
        data(){
            return {
                todos:[],
                filter:'all',
            }
        },
        components:{
            Item,
            Tab,
        },
        computed:{
            filteredTodos(){
                if(this.filter === 'all'){
                    return this.todos;
                }
                const completed = this.filter==='completed'
                return this.todos.filter(todo=>completed ===todo.completed);
            }
        },
        methods:{
            addTodo(e){
                this.todos.unshift({
                    id:id++,
                    content:e.target.value.trim(),
                    completed:false,
                })
                e.target.value =''
            },
            deleteTodo(id){
                this.todos.splice(this.todos.findIndex(todo=>todo.id === id),1)

            },
            toggleFilter(state){
                this.filter = state;
            },
            clearAllFinished(){
                this.todos = this.todos.filter(todo=>!todo.completed)
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .real-app{
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input{
        position relative
        margin 0
        width 100%
        font-size 24px
        font-family inherit
        font-weight inherit
        line-weight 1.4em
        border 0
        outline none
        color inherit
        padding 6px
        border 1px solid #999
        box-shadow inset 0 -1px 5px 0 rhba(0,0,147,0.4)
        box-sizing border-box
        font-smoothing antialiased
        padding 16px 16px 16px 60px
        border none
        box-shadow inset 0 -2px 1px rgba(0,0,0,0.06)
    }
</style>