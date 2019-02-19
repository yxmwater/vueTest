<template>
    <div id="test">{{text}}</div>
</template>

<script>
    export default {
        data(){
            return {
                text : "Hello World"
            }
        }
    }
</script>
<style>
    #test{
        color: red;
    }
</style>