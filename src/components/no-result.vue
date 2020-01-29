<template>
    <div>
        <f7-list class="no-result">
            <f7-list-item>
                <f7-block>কিছু খুঁজে পাওয়া যায়নি।</f7-block>
            </f7-list-item>
        </f7-list>
    </div>
</template>

<script>
    export default {
        name: "no-result"
    }
</script>

<style scoped lang="scss">
    .no-result.list {
        background: #ff6565;
        /* padding: 0; */
        padding-bottom: 0 !important;
        margin: 20px;

        & * {
            margin: 0 auto;
            text-align: center;

        }
    }
</style>