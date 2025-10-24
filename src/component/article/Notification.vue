<script>
//! Appears below the Header tabs, you can see this component imported there!

export default {
  name: "Notification",
  data() { return {
    message: '',
  }},
  methods: {
    notify() {
      //// this.highlightFlare();
    },
    highlightFlare() {
      
    },
    cancel() {

    }
  },
};
</script>

<template>
  <button
    @click=""
    @mouseover="1 + 1"
    class="o-notification"
  >
    <div
      class="c-notification-flare"
      style="
        background-color: var(--color-ui);
        transform: translateX( calc( -0% + 53px ) ) scaleX(1);
      "
    > <!-- See note .c-notification-flare's styles below. Refer to translateX(54px). -->
      <span class="c-notification-message">Respecced, gained: 136 Seeds</span>
    </div>
  </button>
</template>

<style>
/*# Pesky CSS selector specificity */
.o-header > .o-notification {
  pointer-events: auto;
}
.o-header > .o-notification * {
  pointer-events: none;
}

.o-notification {
  width: 64px;
  height: 64px;

  border-left-width: 1px;
  border-left-style: solid;
  border-radius: 50%;

  position: relative;
}

.o-notification::after {
  content: "";
  
  width: 44px;
  height: 44px;

  border-radius: 4px;

  display: flex;
  justify-self: center;
  align-self: center;

  position: absolute;
  inset: 0;
}

.c-notification-flare {
  white-space: nowrap;

  width: fit-content;
  height: 36px;

  padding: 0 8px;
  border-radius: 0 4px 4px 0;

  /* X is translated by 50px; I think this is the "mean" between .o-notification's and its
  ::after's width — that is, (64px + 44px) / 2, which is 54px. But, with the border-radius making a
  bit of a gap, I moved it back by 1px, hence 53px */
}

/* Shadow */
.c-notification-flare::after {
  content: "";

  width: 40px;

  position: absolute;
  inset: 0 auto 0 0;
}

/* Selector angryness */
.c-notification-flare > span.c-notification-message {
  font-size: 20px;
  line-height: 36px; /* .notification-flare's width */
}
</style>