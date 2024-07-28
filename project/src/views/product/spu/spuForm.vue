<template>
<div>
    <el-form>
        <el-form-item label="Spu名称">
            <el-input placeholder="请你输入SPU名称"></el-input>
        </el-form-item>
        <el-form-item label="SPU名牌">
            <el-select>
                <el-option>华为</el-option>
                <el-option>小米</el-option>
                <el-option>苹果</el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textare" placeholder="请你输入SPU描述"></el-input>
        </el-form-item>
        <el-form-item label="SPU图标">
            <el-upload v-model:file-list="fileList" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-dialog>
                <img w-full  alt="Preview Image" />
            </el-dialog>
 
        <el-form-item label="SPU销售属性">
            <!-- 展示销售属性的下拉菜单 -->
            <el-select>
                <el-option label="华为"></el-option>
                <el-option label="oppo"></el-option>
                <el-option label="vivo"></el-option>
            </el-select>
            <el-button style="margin-left:10px" type="primary" size="default" icon="Plus">添加属性值</el-button>
            <!-- table展示销售属性与属性值的地方 -->
            <el-table border style="margin:10px 0px">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名字" width="120px"></el-table-column>
                <el-table-column label="销售属性值"></el-table-column>
                <el-table-column label="操作" width="120px"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default">保存</el-button>
            <el-button type="primary" size="default" @click="cancel" >取消</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script setup lang='ts'>
let $emit=defineEmits(['changeScene'])
const cancel=()=>{
    $emit('changeScene',0)
}
</script>
<style scoped lang='scss'>
</style> 