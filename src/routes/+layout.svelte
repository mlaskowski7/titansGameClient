<script>
    import "../app.css";
	import Footer from "../components/Footer.svelte";
	import Header from "../components/Header.svelte";
</script>

<div class="bg-primaryBg font-Lora text-white">
    <Header />
    <slot/>
    <Footer />
</div>
