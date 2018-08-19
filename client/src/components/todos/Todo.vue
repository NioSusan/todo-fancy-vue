<template>
    <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="panel panel-defaul">
            <div class="panel-body todo">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style>
    .panel-body{
        font-family: 'Arizonia', cursive;
        font-size: 24px;
        color: #6e6e6e;
    }

    .todo{
        cursor: pointer;
    }

    .todo:hover{
        background-color: #ffe2e2;
     
    }

</style>

