<script lang="ts">
    import { faGithub } from '@fortawesome/free-brands-svg-icons';
    import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
</script>

<div class="w-full bg-primaryBg h-[5vh] flex justify-end items-center text-accent font-bold text-[10px] gap-4 px-5">
    <p>
        Developed by Mateusz Laskowski, feel free to contribute
    </p>
    <a href="https://github.com/mlaskowski7/titansGame" target="_blank" class="text-[18px] hover:brightness-75 duration-300 ease-in-out">
        <FontAwesomeIcon icon={faGithub} />
    </a>
    <a href="mailto:mtlaskowski7@gmail.com" target="_blank" class="text-[18px] hover:brightness-75 duration-300 ease-in-out">
        <FontAwesomeIcon icon={faEnvelope} />
    </a>
</div>