<template>
    <div>
        <el-card>
            <el-form :inline="true">
                <el-form-item label="一级分类">
                    <el-select >
                        <el-option>false</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select >
                        <el-option>false</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select >
                        <el-option>false</el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin:10px 0px" >
            <el-button type="primary" size="default" @click="" icon="Plus">添加属性</el-button>
            <el-table border style="margin: 10px 0px;">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px"></el-table-column>
                <el-table-column label="属性值名称" ></el-table-column>
                <el-table-column label="操作" width="120px"></el-table-column>
            </el-table>
        </el-card>
    </div>
    </template>
    <script setup lang='ts'>
    </script>
    <style scoped lang='scss'>
    </style> 