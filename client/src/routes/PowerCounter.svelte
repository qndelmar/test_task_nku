<script lang="ts">
    import {onMount} from "svelte";
    let percent:number = 0;
    let webSocket:WebSocket;
    onMount(() => {
        webSocket = new WebSocket('ws://localhost:7071');
        webSocket.onmessage = (e:MessageEvent) => {
            percent = e.data;
        }
    })

    function changeValue(e){
        webSocket.send(percent.toString());
    }
</script>

<div class="power-indicator-wrapper">
<p>Мощность:</p>
<span class="percent-indicator">{percent}%</span>
    <input type="range" bind:value={percent} on:change={changeValue} style="display: block;" min="0" max="100">
</div>

<style>
    p{
        font-weight: 900;
        color: black;
        font-size: 1.5em;
        margin: 0;
    }
    .power-indicator-wrapper{
        margin: 0 auto;
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .percent-indicator{
        font-size: 4em;
    }
</style>