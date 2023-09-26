<template>
  <main>
    <section class="hero-main">
      <div class="hero-CTA">
        <h1 data-text="Welcome,">Welcome,</h1>
        <p>
          Looking for the ultimate buzz? Unveil the glowing recipes that match
          your vibe by searching below.
        </p>
      </div>
      <figure class="main-figure">
        <img
          src="@/assets/media/cropped-hero-main.png"
          alt="Neon bottles main header"
        />
      </figure>
      <div class="searchbar-wrapper">
        <div class="searchbar">
          <img src="@/assets/media/icons/searchIcon.svg" alt="search icon" />
          <input type="text" placeholder="Search . . ." />
        </div>
      </div>
      <div class="stats">
        <figure>
          <img
            src="@/assets/media/icons/cocktail-icon.svg"
            alt=""
            class="icons"
          />
          <figcaption>
            <p>Total Drinks: <span class="span-cocktail">636</span></p>
          </figcaption>
        </figure>
        <figure>
          <img src="@/assets/media/icons/cart.svg" alt="" class="icons" />
          <figcaption>
            <p>Total Ingredients: <span class="span-ingredients">489</span></p>
          </figcaption>
        </figure>
      </div>
    </section>
    <section class="popular-drinks">
      <figure class="title-section">
        <img
          src="@/assets/media/icons/cocktail-icon.svg"
          alt="Pink Cocktail Icon"
        />
        <figcaption>
          <h2>Popular drinks,</h2>
        </figcaption>
      </figure>
      <div class="cocktail-container"></div>
    </section>
    <section class="new-drinks">
      <figure class="title-section">
        <img
          src="@/assets/media/icons/cocktail-icon.svg"
          alt="White Cocktail Icon"
        />
        <figcaption>
          <h2>Latest drinks,</h2>
        </figcaption>
      </figure>
      <div class="cocktail-container"></div>
    </section>
  </main>
</template>

<script></script>

<style lang="scss">
@import "@/assets/scss/_reset.scss";
.hero-main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 82vh;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("@/assets/media/background/Bubble=Default.svg") center
      bottom / contain no-repeat;
    opacity: 0.3;
    z-index: -1;
  }

  .hero-CTA {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    max-width: 650px;
    padding: 30px 15px;
    gap: 15px;

    & > h1 {
      position: relative;
      font-size: 2.8rem;
      line-height: 4rem;
      font-family: $titleFont;
      &::before {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        color: $accent-NeonBlue;
        text-shadow: $white-NeonEffect;
      }
      color: transparent;
      background: $blue-LinearGradient;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    & > p {
      font-size: 0.9rem;
      text-transform: capitalize;
      font-family: $semiBoldText;
    }
  }

  .main-figure {
    & > img {
      max-width: 1456px;
      width: 100%;
      height: auto;
    }
  }

  .searchbar-wrapper {
    display: inline-block;
    width: 300px;
    padding: 1px;
    background: $neon-LinearGradient;
    border-radius: $radius-180;

    &:hover .searchbar {
      box-shadow: $pink-NeonEffect;
    }

    & > .searchbar {
      position: relative;
      display: flex;
      box-sizing: border-box;
      justify-content: flex-start;
      align-items: center;
      width: 300px;
      padding: 16px;
      gap: 10px;
      border-radius: $radius-180;
      background-color: $primary-Background;

      & > input[type="text"] {
        color: $default-White;
        font-family: $lighterText;
        background-color: transparent;
        border: none;
        outline: transparent;
      }
    }
  }

  .stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 320px;
    padding: 25px 15px;
    gap: 15px;

    & > figure {
      display: flex;
      gap: 10px;

      & > figcaption {
        & > p {
          font-size: 0.9rem;
          text-transform: capitalize;

          & > .span-cocktail {
            color: $accent-NeonPink;
          }

          & > .span-ingredients {
            color: $accent-NeonBlue;
          }
        }
      }
    }
  }

  // @media screen and (min-width: 1020px) {
  // }
}

.popular-drinks {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 90vh;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("@/assets/media/background/Bubble=ReversedFlip.svg") center
      top / contain no-repeat;
    opacity: 0.3;
    z-index: -1;
  }
  & > .title-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    & > img {
      filter: invert(36%) sepia(64%) saturate(2193%) hue-rotate(294deg)
        brightness(101%) contrast(87%);
    }
    & > figcaption > h2 {
      color: $default-White;
      background: $pink-LinearGradient;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      width: fit-content;
      text-shadow: $pink-NeonEffect;
      font-family: $titleFont;
      font-size: 1.8rem;
      line-height: 4rem;
      text-transform: capitalize;
    }
  }
}

.new-drinks {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 80vh;
  & > .title-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    & > img {
      filter: invert(99%) sepia(74%) saturate(321%) hue-rotate(165deg)
        brightness(109%) contrast(95%);
    }
    & > figcaption > h2 {
      color: $default-White;
      background: $blue-LinearGradient;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      width: fit-content;
      text-shadow: $blue-NeonEffect;
      font-family: $titleFont;
      font-size: 1.8rem;
      line-height: 4rem;
      text-transform: capitalize;
    }
  }
}
</style>
