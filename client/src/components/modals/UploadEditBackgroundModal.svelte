<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import { l } from '../../services/store'
  import type { PageData } from '../../routes/(authed)/dashboard/backgrounds/$types'
  import type { BackgroundsRes } from '../../../../shared/types/features/background'
  import apiBackgroundsService from '../../services/api/api-backgrounds.service'
  import Toggle from '../Toggle.svelte'

  interface Props {
    data: PageData
    show: boolean
    action?: { action: 'upload' } | { action: 'edit'; background: BackgroundsRes }
  }

  let { data = $bindable(), show = $bindable(), action = $bindable({ action: 'upload' }) }: Props = $props()

  let title: string = $state('')
  let status: boolean = $state(false)
  let disableStatus: boolean = $state(false)
  let file: File | null = $state(null)

  function update() {
    if (action.action === 'upload') {
      title = ''
      status = false
      disableStatus = false
    } else {
      title = action.background.title!
      status = action.background.status == 1
      disableStatus = status
    }
  }

  async function uploadFile() {
    const backgroundUpload = document.getElementById('background') as HTMLInputElement

    backgroundUpload.click()

    await new Promise((resolve) => {
      backgroundUpload!.addEventListener('change', resolve, { once: true })
    })

    if (backgroundUpload.files) file = backgroundUpload.files.item(0)
  }

  function reset() {
    const backgroundUpload = document.getElementById('background') as HTMLInputElement

    if (backgroundUpload) {
      backgroundUpload.value = ''
      backgroundUpload.files = null
    }
  }

  async function submit(e: SubmitEvent) {
    e.preventDefault()
    console.log('submit')
    const backgroundUpload = document.getElementById('images') as HTMLInputElement

    if (!title || title === '' || !file) return
    if (action.action === 'upload') {
      ;(await apiBackgroundsService.uploadBackground(title, status === true ? 1 : 0, file!)).subscribe({
        next: (res) => {
          data.backgrounds = res.body.data!
          show = false
        }
      })
    } else {
      ;(await apiBackgroundsService.putBackgroundTitle(action.background.id!, title)).subscribe({
        next: (res) => {
          data.backgrounds = res.body.data!
          show = false
        }
      })
      if (status) {
        ;(await apiBackgroundsService.putActiveBackground(action.background.id!)).subscribe({
          next: (res) => {
            data.backgrounds = res.body.data!
          }
        })
      }
    }

    if (backgroundUpload) {
      backgroundUpload.value = ''
      backgroundUpload.files = null
      file = null
    }
  }

  $effect(() => {
    if (show) update()

    file = null as File | null
  })
</script>

<ModalTemplate size={'s'} bind:show>
  <form onsubmit={submit}>
    <h2>{action.action === 'upload' ? 'Upload a background' : 'Edit the background title'}</h2>

    <label for="version" style="margin-top: 0">Title</label>
    <input type="text" id="version" placeholder={action.action === 'upload' ? 'Background title' : title} bind:value={title} />

    {#if action.action === 'upload'}
      <p class="label" style="margin-top: 20px">Background</p>
      {#if !file}
        <button class="secondary upload" onclick={uploadFile} type="button">
          <i class="fa-solid fa-file-arrow-up"></i>&nbsp;&nbsp;Select a file...
        </button>
      {:else}
        <p class="no-link">{file.name}</p>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="remove" onclick={reset} type="button"><i class="fa-solid fa-circle-xmark"></i></button>
      {/if}
    {/if}

    <p class="label">Background status</p>
    <Toggle bind:status text={['Active', 'Inactive']} disabled={disableStatus}></Toggle>

    <div class="actions">
      <button class="secondary" onclick={() => (show = false)} type="button">{$l.main.cancel}</button>
      <button class="primary" disabled={!title || title == '' || (!file && action.action === 'upload')}>{$l.main.save}</button>
    </div>

    <input type="file" id="background" accept="image/*" style="display: none" />
  </form>
</ModalTemplate>

<style lang="scss">
  @use '../../assets/scss/modals.scss';

  button.secondary.upload {
    margin-top: 0;
  }

  p.no-link {
    margin: 0px;
    display: inline-block;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    padding: 8px 0 7px 0;
  }

  button.remove {
    display: inline-block;
    border-bottom: none;
    margin-left: 5px;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    background: none;
    color: var(--red-color);
    vertical-align: middle;

    &:hover {
      background: #faeeee;
    }
  }
</style>
