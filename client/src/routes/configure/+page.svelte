<script lang="ts">
  import ConfigurationAdmin from '../../components/configuration/ConfigurationAdmin.svelte'
  import ConfigurationDatabase from '../../components/configuration/ConfigurationDatabase.svelte'
  import ConfigurationLanguage from '../../components/configuration/ConfigurationLanguage.svelte'
  import { env, l } from '../../services/store'
  import { goto } from '$app/navigation'
  import type { PageData } from './$types'
  import utils from '../../services/utils'
  import { fade } from 'svelte/transition'

  interface Props {
    data: PageData
  }

  let { data }: Props = $props()

  if (data.start) {
    start()
  }

  let h1Visible: boolean = $state(false)
  let sliderVisible: boolean = $state(false)
  let h1: string = $state('')

  let step = $state(0)

  async function start() {
    await utils.sleep(1000)
    // h1 = 'Welcome!'
    // h1Visible = true
    // await utils.sleep(2000)
    // h1Visible = false
    // await utils.sleep(1000)
    // h1 = 'You can now configure EML&nbsp;Admintool.'
    // h1Visible = true
    // await utils.sleep(3000)
    h1Visible = false
    await utils.sleep(500)

    sliderVisible = true
    step = 1
  }

  function nextStep() {
    step++
    if (step == 4) {
      finish()
    }
  }

  function prevStep() {
    step--
  }

  async function finish() {
    await utils.sleep(1000)
    sliderVisible = false
    await utils.sleep(500)
    h1 = $l.configuration.finally
    h1Visible = true
    await utils.sleep(2000)
    h1Visible = false
    await utils.sleep(1000)
    goto('/')
  }
</script>

<svelte:head>
  <title>{$l.configuration.configuration} • {$env.name} AdminTool</title>
</svelte:head>

<div class="progress">
  <span class:step-0={step == 0} class:step-1={step == 1} class:step-2={step == 2} class:step-3={step == 3} class:step-4={step == 4}></span>
</div>

{#if h1Visible}
  <h1 transition:fade>{@html h1}</h1>
{/if}

{#if sliderVisible}
  <div
    class="config-slider"
    class:step-0={step == 0}
    class:step-1={step == 1}
    class:step-2={step == 2}
    class:step-3={step == 3}
    class:step-4={step == 4}
    id="config-slider"
    transition:fade
  >
    <div class="config-1">
      <ConfigurationLanguage {nextStep} />
    </div>
    <div class="config-2">
      <ConfigurationDatabase {nextStep} {prevStep} />
    </div>
    <div class="config-3">
      <ConfigurationAdmin {nextStep} {prevStep} />
    </div>
  </div>
{/if}

<style lang="scss">
  h1 {
    text-align: center;
    font-size: 56px;
    margin-top: 33vh;
    transition:
      opacity 0.5s,
      display 0.5s;
  }

  div.config-slider {
    width: 400vw;
    overflow-x: hidden;
    position: relative;
    transition: left 0.5s ease;

    &.step-1,
    &.step-0 {
      left: 0;
    }

    &.step-2 {
      left: -100vw;
    }

    &.step-3 {
      left: -200vw;
    }

    &.step-4 {
      left: -300vw;
    }

    div.config-1,
    div.config-2,
    div.config-3 {
      width: 100vw;
      display: inline-block;
      vertical-align: top;
      height: calc(100vh - 5px);
    }
  }

  div.progress {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: var(--medium-background-color);

    span {
      height: 5px;
      width: 0;
      transition: width 0.8s cubic-bezier(0, 0, 0.2, 1);
      background-color: var(--primary-color);
      display: block;
      border-top-right-radius: 50rem;
      border-bottom-right-radius: 50rem;

      &.step-0 {
        width: 1%;
      }

      &.step-1 {
        width: 17%;
      }

      &.step-2 {
        width: 50%;
      }

      &.step-3 {
        width: 84%;
      }

      &.step-4 {
        width: 100%;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
</style>
