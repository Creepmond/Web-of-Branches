<script>
//! Appears below the Header tabs, you can see this component imported there!

export default {
  name: "Notification",
  data() { return {
    slottedId: 0,

    queue: [
      {
        id: -2,
        text: 'Respecced, gained: 136 Seeds',
        colorInfluence: 'study',
      },
      {
        id: -1,
        text: 'Bite me',
        colorInfluence: 'good',
      },
    ],
  }},
  methods: {
    notify() {
      //// this.highlightFlare();
    },
    highlightFlare(id) {
      
    },
    cancel(flareId) {
      this.queue = this.queue.filter(message => message.id !== flareId);
    },

    notificationPosition(id) {
      const visible = this.queue.length === 0;
      return `transform: translateX( ${-128 * visible}px );`
    },
    flarePosition(id) {
      return `transform: translateX( calc( -0% + 53px ) ) scaleX(1);`
    }
  },
  mounted() {
    console.log(this.queue)

    /*
    setInterval(() => {
      this.queue.push({
        id: this.slottedId++,
        text: 'Foo',
        colorInfluence: 'bad'
      });

      console.log(this.queue)
    }, 20 * 1000)
    */
  },
};
</script>

<template>
  <button
    v-for="message in queue"
    :key="message.id"
    @click="cancel(message.id)"
    @mouseover="1 + 1"
    class="o-notification"
    :style="notificationPosition(message.id)"
  >
    <div
      class="c-notification-flare"
      :style="[
        flarePosition(message.id),
        `background-color: color-mix(
          in srgb,
          var(--color-ui) 85%,
          var(--color-${message.colorInfluence})
        )`]
      "
    > <!-- See note .c-notification-flare's styles below. Refer to translateX(54px). -->
      <span class="c-notification-message">{{ message.text }}</span>
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