<script lang="ts">
	import type { User } from "$lib";

    export let players: User[];
  
    // Sort players based on their scores, highest first
    let sortedPlayers = [...players].sort((a, b) => b.points - a.points);
  
    // Define podium styles for first, second, and third place
    let podiumHeights = ['h-52', 'h-40', 'h-36'];
  </script>
  
  <style>
    .podium {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 20px;
    }
  
    .podium-section {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      width: 100px;
      border-radius: 5px;
      padding: 10px;
      color: white;
      font-weight: bold;
    }
  </style>
  
  <div class="flex gap-20">
    <div class="podium">
        {#each sortedPlayers.slice(0, 3) as player, index}
          <div class="podium-section {podiumHeights[index]} bg-secondaryBg">
            <span>{index + 1}.</span>
            <span>{player.username}</span>
            <span class="text-accent">{player.points} pts</span>
          </div>
        {/each}
    </div>
    <div class="flex flex-col bg-secondaryBg gap-2 rounded-xl p-4 items-center justify-center">
        {#each sortedPlayers.slice(3) as player, index}
          <div class="font-bold">
            <span>{index + 4}.</span>
            <span>{player.username}</span>
            <span class="text-accent ml-2">{player.points} pts</span>
          </div>
        {/each}
    </div>
  </div>
  
  