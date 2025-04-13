<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
		<Header/>
		<main>
				<div class="container">
						<h1 class="title">Конвертер валют</h1>
						<router-view/>
				</div>
		</main>
</template>