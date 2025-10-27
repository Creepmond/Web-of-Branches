<script>
//! Appears below the Header tabs, you can see this component imported there!

export default {
  name: "Notification",
  data() { return {
    slottedId: 0,

    queueDurationMap: [
      ['-3', 5000],
      ['-2', 5000],
      ['-1', 5000],
    ],

    // This Object is actually a lot dumber than you might think. They contain a key-value pair,
    // where the key is a stringed number. So it's like an Array, but a little easier to find an
    // item instance. I would have used a new Map(), but those aren't reactive
    maintainedQueue: {
      '-3': {
        text: 'Respecced, gained: 136 Seeds',
        colorInfluence: 'study',
        isShown: true,
      },
      '-2': {
        text: 'Bite me',
        colorInfluence: 'good',
        isShown: true,
      },
      '-1': {
        text: 'I couldn\'t ever without you',
        colorInfluence: 'good',
        isShown: true,
      },
    },
  }},
  watch: {
    queueDurationMap(diff, init) {
      let deltaDurationMap = [];
      outerloop: for (const initMap of init) {
        for (const diffMap of diff) {
          if (initMap[0] === diffMap[0]) continue outerloop;
        }

        // I *know* this one can just be done if deltaMap was a let... but hey, this looks
        // fancier. I like color-coding
        deltaDurationMap = initMap;
      }
      
      const index = deltaDurationMap[0];
      const duration = deltaDurationMap[1];

      this.maintainedQueue[index].isShown = false;

      setTimeout(() => {
        delete this.maintainedQueue[index];
        console.log(duration)
      }, duration);
    },
  },
  methods: {
    notify() {
      //// this.highlightFlare();
    },
    highlightFlare(id) {
      
    },
    cancel(flareId) {
      this.queueDurationMap = this.queueDurationMap.filter(
        durationMap => durationMap[0] !== flareId
      );
    },
  },
  mounted() {
    // console.log(this.queueDurationMap)

    /*
    setInterval(() => {
      this.queue.push({
        id: this.slottedId++,
        text: 'Foo',
        colorInfluence: 'bad'
      });

      console.log(this.queue)
    }, 2 * 1000)
    */
  },
};
</script>

<template>
  <button
    v-for="(message, id) in maintainedQueue"
    :key="id"
    @click="cancel(id)"
    @mouseover="1 + 1"
    class="o-notification"
    :style="`transform: translateX( ${-128 * 0}px );`"
  >
    <div
      class="c-notification-flare"
      :style="`
        transform:
          translateX( calc( ${message.isShown ? 0 : -50}% + 53px ) )
          scaleX(${message.isShown ? 1 : 0});
        background-color: color-mix(
          in srgb,
          var(--color-ui) 85%,
          var(--color-${message.colorInfluence})
        );`
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