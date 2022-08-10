<template>
    <div :class="classes" :id="id" abbreviateNumber>
        {{output}}
        <q-tooltip content-class="bg-black text-body1 text-bold" anchor="bottom middle" :target="'#'+id+' img'">
                {{value}}
        </q-tooltip>
        <img :src="require('assets/info.svg')" alt="info" />
    </div>
</template>

<script>
export default {
    name: 'AbbreviateNumber',
    props: {
        classes: {
            type: String,
            default: 'text-bold text-h4'
        },
        value: {
            type: String,
            default: "0"
        }
    },
    computed: {
        output(){
            return this.$options.filters.shortNumber(this.value)
        },
        id(){
            return 'abb-'+Math.floor(Math.random()*99999)
        }
    }
}
</script>

<style>
[abbreviateNumber]{
    line-height:1;
    letter-spacing:-2px;
}
[abbreviateNumber] img{
    width: 15px;
    margin-left: 2px
}
.bg-black{
    background-color: #000
}
</style>