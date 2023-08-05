<script lang="ts">
	import settingsObserver from '../../observers/settings'

	let name = 'Svelte'
	const handleClick = () => {
		name = 'Svelte 3'
		// TODO: use event emitter to open settings modal
		settingsObserver.emit('open')
	}
</script>

<div
	on:click={handleClick}
	class="chat-actions-item cursor-pointer hover:bg-secondary-lightest active:bg-secondary-lightest/60"
>
	<div class="select-none overflow-hidden truncate pr-2 text-sm font-medium">
		Better Kick Settings
	</div>
	<div class="flex h-10 w-fit items-center justify-end">S</div>
</div>

<style>
  .better-kick-settings-container {

  }
</style>
