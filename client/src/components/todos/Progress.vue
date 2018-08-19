<template>
    <div class="row">
        <div class="col-sm-12">
            <h3>Todos Added</h3>
            <div class="progress">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="60"  aria-valuemin="0" aria-valuemax="100"
                    :style="{width: (todoCount/maxTodos) * 100 + '%'}">
                        {{todoCount}} / {{maxTodos}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['todoCount', 'maxTodos']
}
</script>

