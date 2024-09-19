<script lang="ts">
    import type { User } from "$lib";
  
    export let currentUser: User | null;
    let character = 1;
  </script>
  
  <div class="flex flex-row justify-center items-center text-[24px] font-lido">
    <div>
      
    </div>
    <div class="flex flex-col items-start justify-center gap-2 p-5 mb-[100px]">
        <div class="text-accent uppercase font-mono">{currentUser?.username}</div>
        <div class="text-[16px]">Character: {currentUser?.character_id}</div>
        <div class="text-[16px]">Account created at: {currentUser?.created_at.split('T')[0]}</div>
        <div class="text-[16px]">Player number: {currentUser?.id}</div>
        <div class="text-[16px]">Times logged in: 10</div>
    </div>
    
  </div>
  