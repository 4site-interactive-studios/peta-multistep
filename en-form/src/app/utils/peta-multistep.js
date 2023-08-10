import "./confetti";
export class PetaMultistep {
  constructor() {
    console.log("PetaMultistep: constructor");
    window.dataLayer = window.dataLayer || [];
    this.multisteps = document.querySelectorAll(".peta-multistep");
    if (!this.multisteps.length) {
      if (this.isDebug())
        console.log("PetaMultistep: constructor: no multisteps found");
      return;
    }
    this.defaultOptions = {
      name: "PETA Multi-Step",
      image: "",
      video: "",
      video_auto_play: false,
      logo: "",
      logo_position: "top",
      logo_position_options: ["top", "bottom"],
      content_position: "left",
      title: "",
      paragraph: "",
      mobile_enabled: true,
      mobile_title: "",
      mobile_paragraph: "",
      footer: "",
      bg_color: "#254d68",
      txt_color: "#FFFFFF",
      form_color: "#2375c9",
      url: null,
      cookie_hours: 24,
      cookie_name: "HidePetaMultistep",
      view_more: false,
      type: "lightbox",
      hero_type: "image",
      append_url_params: "false",
      confetti: ["#2375c9", "#254d68", "#FFFFFF"],
    };
    this.lightbox = null;
    this.animationCount = 0;
    this.options = {};
    this.container = {};
    this.containerID = {};
    this.donationinfo = {};
    this.multisteps.forEach((multistep, key) => {
      multistep.dataset.key = key;
      this.options[key] = { ...this.defaultOptions };
      this.donationinfo[key] = {};
    });
    this.init();
  }
  loadOptions() {
    this.multisteps.forEach((multistep, key) => {
      // Get Data Attributes
      let data = multistep.dataset;
      // Set Options
      if ("id" in data) this.options[key].id = data.id;
      if ("url" in data) this.options[key].url = data.url;
      if ("name" in data) this.options[key].name = data.name;
      if ("image" in data) this.options[key].image = data.image;
      if ("video" in data) this.options[key].video = data.video;
      if ("videoAutoPlay" in data)
        this.options[key].video_auto_play = data.videoAutoPlay;
      if ("logo" in data) this.options[key].logo = data.logo;
      if ("logoPosition" in data)
        this.options[key].logo_position = JSON.parse(data.logoPosition);
      if ("logoPositionOptions" in data)
        this.options[key].logo_position_options = JSON.parse(
          data.logoPositionOptions
        );
      if ("title" in data) this.options[key].title = data.title;
      if ("paragraph" in data) this.options[key].paragraph = data.paragraph;
      if ("mobileEnabled" in data)
        this.options[key].mobile_enabled = data.mobileEnabled;
      if ("mobileTitle" in data)
        this.options[key].mobile_title = data.mobileTitle;
      if ("mobileParagraph" in data)
        this.options[key].mobile_paragraph = data.mobileParagraph;
      if ("footer" in data) this.options[key].footer = data.footer;
      if ("bgColor" in data) this.options[key].bg_color = data.bgColor;
      if ("txtColor" in data) this.options[key].txt_color = data.txtColor;
      if ("formColor" in data) this.options[key].form_color = data.formColor;
      if ("url" in data) this.options[key].url = data.url;
      if ("cookieHours" in data)
        this.options[key].cookie_hours = data.cookieHours;
      if ("cookieName" in data) this.options[key].cookie_name = data.cookieName;
      if ("viewMore" in data) this.options[key].view_more = data.viewMore;
      if ("type" in data) this.options[key].type = data.type;
      if ("heroType" in data) this.options[key].hero_type = data.heroType;
      if ("appendUrlParams" in data)
        this.options[key].append_url_params = !!(
          data.appendUrlParams === "true"
        );
      if ("contentPosition" in data)
        this.options[key].content_position = data.contentPosition;
      if ("confetti" in data)
        this.options[key].confetti = JSON.parse(data.confetti);
      if (this.isDebug())
        console.log("PetaMultistep: loadOptions: options: ", this.options[key]);
    });
  }
  init() {
    console.log("PetaMultistep: init");
    window.addEventListener("message", this.receiveMessage.bind(this), false);
    this.loadOptions();
    this.build();
  }
  build() {
    if (this.isDebug()) console.log("PetaMultistep: build");
    this.multisteps.forEach((multistep, key) => {
      if (this.options[key].type === "lightbox" && this.getCookie(key)) {
        if (this.isDebug())
          console.log(
            "PetaMultistep: build: cookie found, skipping lightbox: ",
            this.options[key].id
          );
        return;
      }
      const url = new URL(this.options[key].url);
      this.containerID[key] = `peta-multistep-${this.options[key].id}`;
      url.searchParams.append("color", this.options[key].form_color);
      if (this.options[key].append_url_params) {
        const urlParams = new URLSearchParams(window.location.search);
        for (const [key, value] of urlParams) {
          url.searchParams.append(key, value);
        }
      }
      const containerClass =
        this.options[key].type === "lightbox"
          ? `foursitePetaMultistepLightbox`
          : `foursitePetaMultistepEmbed`;
      const container = document.createElement("div");
      container.id = this.containerID[key];
      container.dataset.key = key;
      container.classList.add(containerClass);
      container.classList.add(
        "content-position-" + this.options[key].content_position
      );
      const mobile_markup = this.options.mobile_title
        ? `
      <div class="${containerClass}-mobile-container">
        <h1 class="${containerClass}-mobile-title">${this.options.mobile_title}</h1>
        <p class="${containerClass}-mobile-paragraph">${this.options[key].mobile_paragraph}</p>
      </div>
      `
        : "";
      const markup = `
      ${mobile_markup}
      <div class="${containerClass}-container">
        ${
          this.options[key].logo
            ? `<img class="dl-mobile-logo" src="${this.options[key].logo}" alt="${this.options[key].title}">`
            : ""
        }
        <div class="dl-content">
          <div class="left" style="background-color: ${
            this.options[key].bg_color
          }; color: ${this.options[key].txt_color}">
            ${
              this.options[key].logo
                ? `<img class="dl-logo" src="${this.options[key].logo}" alt="${this.options[key].title}">`
                : ""
            }
            ${
              this.options[key].view_more
                ? `
            <a href="#" class="dl-close-viewmore" style="color: ${this.options[key].bg_color};">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path fill="currentColor" d="M7.214.786c.434-.434 1.138-.434 1.572 0 .433.434.433 1.137 0 1.571L4.57 6.572h10.172c.694 0 1.257.563 1.257 1.257s-.563 1.257-1.257 1.257H4.229l4.557 4.557c.433.434.433 1.137 0 1.571-.434.434-1.138.434-1.572 0L0 8 7.214.786z"></path>
              </svg>
            </a>
            `
                : ""
            }
            
            <div class="dl-container" data-view-more="${
              this.options[key].view_more ? "true" : "false"
            }">
              ${this.loadHero(key)}
              ${
                this.options[key].divider
                  ? `<img class="dl-divider" src="${this.options[key].divider}" alt="Divider">`
                  : ""
              }
              <div class="dl-container-inner" style="background-color: ${
                this.options[key].bg_color
              }; color: ${this.options[key].txt_color}">
                <h1 class="dl-title" style="color: ${
                  this.options[key].txt_color
                }">${this.options[key].title}</h1>
                <p class="dl-paragraph" style="color: ${
                  this.options[key].txt_color
                }">${this.options[key].paragraph}</p>
                ${
                  this.options[key].view_more
                    ? `
                        <a class="dl-viewmore" href="#"style="color: ${this.options[key].txt_color}; border-color: ${this.options[key].txt_color}">View More</a>
                      `
                    : ""
                }
              </div>
              <div class="dl-celebration">
                <div class="frame frame1">
                    <h3>and the animals</h3>
                    <h2>THANK YOU!</h2>
                </div>
                <div class="frame frame2">
                  <div class="bunnyAnimation"></div>
                </div>
                <div class="frame frame3">
                  <h2 class="name">Friend,</h2>
                  <h2 class="phrase">you are a hero <br>to animals.</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <a href="#" class="dl-button-close"></a>
            <div class="dl-loading" style="background-color: ${
              this.options[key].form_color
            }">
              <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
              </div>
            </div>
            <iframe allow='payment' loading='lazy' id='iframe_${
              this.containerID[key]
            }' width='100%' scrolling='no' class='dl-iframe' src='${url}' frameborder='0' data-key='${key}' allowfullscreen></iframe>
          </div>
        </div>
        <div class="dl-footer">
          <p>${this.options[key].footer}</p>
        </div>
      </div>
    `;
      if (this.options[key].view_more) {
        const additionalStylesElement = document.head.appendChild(
          document.createElement("style")
        );

        additionalStylesElement.innerHTML = `
      #${this.options[key].id} .dl-container-inner::-webkit-scrollbar-thumb {
        background: ${this.options.form_color};
        border-radius: 10px;
      }

      #${this.options[key].id} .dl-container.playing .btn-pause:hover {
        color: ${this.options.form_color}
      }
    `;
      }
      container.innerHTML = markup;
      this.container[key] = container;
      this.render(key);
    });
    this.cleanUp();
  }

  render(key) {
    if (this.options[key].type === "lightbox") {
      if (this.lightbox)
        return console.warn(
          `Multiple lightboxes are not supported. Ignoring ${this.containerID[key]} lightbox.`
        );
      this.lightbox = this.container[key];
      this.lightbox.classList.add("is-hidden");
      this.lightbox.classList.add("peta-multistep-lightbox");
      // Add Event Listeners
      const closeButton = this.lightbox.querySelector(".dl-button-close");
      if (closeButton) {
        closeButton.addEventListener("click", this.close.bind(this));
        document.addEventListener("keyup", (e) => {
          if (e.key === "Escape") {
            closeButton.click();
          }
        });
      }
      this.lightbox.addEventListener("click", (e) => {
        if (e.target.id == this.containerID[key]) {
          this.close(e);
        }
      });
      const videoElement = this.lightbox.querySelector("video");
      if (videoElement) {
        const playButton = this.lightbox.querySelector(".btn-play");
        const pauseButton = this.lightbox.querySelector(".btn-pause");

        if (playButton) {
          playButton.addEventListener("click", () => {
            videoElement.play();
          });
        }

        if (pauseButton) {
          pauseButton.addEventListener("click", () => {
            videoElement.pause();
          });
        }

        videoElement.addEventListener("play", (event) => {
          this.lightbox.querySelector(".dl-container").classList.add("playing");
          this.lightbox
            .querySelector(".dl-container")
            .classList.remove("paused");
        });

        videoElement.addEventListener("pause", (event) => {
          this.lightbox
            .querySelector(".dl-container")
            .classList.remove("playing");
          this.lightbox.querySelector(".dl-container").classList.add("paused");
        });

        videoElement.addEventListener("ended", (event) => {
          this.lightbox
            .querySelector(".dl-container")
            .classList.remove("playing");
          this.lightbox
            .querySelector(".dl-container")
            .classList.remove("paused");
          videoElement.load();
        });
      }
      document.body.appendChild(this.lightbox);
      this.open();
    } else {
      // Render iframe on page
      const container = document.querySelector(
        `.peta-multistep-${this.options[key].id}`
      );
      if (container) {
        container.parentNode.insertBefore(this.container[key], container);
      }
    }
  }

  open() {
    console.log(this.lightbox);
    const action = window.petaGA_GenericAction_Viewed ?? "Viewed";
    const category = window.petaGA_SplashCategory ?? "Splash Page";
    const label =
      window.petaGA_SplashLabel ?? this.options[this.lightbox.dataset.key].name;
    this.sendGAEvent(category, action, label);
    this.lightbox.classList.remove("is-hidden");
    document.body.classList.add("has-PetaMultistep-lightbox");
  }

  close(e) {
    const action = window.petaGA_GenericAction_Closed ?? "Closed";
    const category = window.petaGA_SplashCategory ?? "Splash Page";
    const label =
      window.petaGA_SplashLabel ?? this.options[this.lightbox.dataset.key].name;
    const videoElement = this.lightbox.querySelector("video");
    this.sendGAEvent(category, action, label);
    e.preventDefault();
    this.lightbox.classList.add("is-hidden");
    document.body.classList.remove("has-PetaMultistep-lightbox");
    if (videoElement) {
      videoElement.pause();
    }
    if (this.options[this.lightbox.dataset.key].url) {
      this.setCookie(
        this.lightbox.dataset.key,
        this.options[this.lightbox.dataset.key].cookie_hours
      );
    }
  }
  getFrameByEvent(event) {
    return [].slice
      .call(document.getElementsByTagName("iframe"))
      .filter(function (iframe) {
        return iframe.contentWindow === event.source;
      })[0];
  }

  // Receive a message from the child iframe
  receiveMessage(event) {
    // console.log("PetaMultistep: receiveMessage: event: ", event.data);
    const message = event.data;
    const iframe = this.getFrameByEvent(event);
    if (!iframe.hasAttribute("data-key")) return;
    const key = iframe.dataset.key;

    if (message && "frameHeight" in message) {
      iframe.style.height = message.frameHeight + "px";
      if ("scroll" in message && !this.isInViewport(iframe)) {
        // Scroll to the top of the iframe smoothly
        iframe.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return;
    }

    switch (message.key) {
      case "status":
        this.status(message.value, key);
        break;
      case "error":
        this.error(message.value, key);
        break;
      case "class":
        this.container[key].classList.add(message.value);
        break;
      case "donationinfo":
        this.donationinfo[key] = JSON.parse(message.value);
        console.log(
          "PetaMultistep: receiveMessage: donationinfo: ",
          this.donationinfo[key]
        );
        break;
    }
  }
  status(status, key) {
    console.log("PetaMultistep: status: ", status, key);
    switch (status) {
      case "loading":
        this.container[key]
          .querySelector(".dl-loading")
          .classList.remove("is-loaded");
        break;
      case "loaded":
        this.container[key]
          .querySelector(".dl-loading")
          .classList.add("is-loaded");
        break;
      case "submitted":
        this.donationinfo[key].frequency =
          this.donationinfo[key].frequency == "no"
            ? ""
            : this.donationinfo[key].frequency;
        let iFrameUrl = new URL(
          this.container[key].querySelector("iframe").src
        );
        for (const key in this.donationinfo[key]) {
          iFrameUrl.searchParams.append(key, this.donationinfo[key]);
        }
        this.container[key].querySelector("iframe").src = iFrameUrl
          .toString()
          .replace("/donate/1", "/donate/2");
        break;
      case "celebrate":
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (this.options[key].content_position == "hidden") {
          this.startConfetti(key);
          break;
        }
        if (motion.matches) {
          this.celebrate(key, false);
        } else {
          this.celebrate(key);
        }
        break;
    }
  }
  error(error, key) {
    this.shake(key);
    // console.error(error);
    const container = this.container[key].querySelector(".dl-content .right");
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.style.borderRadius = this.options.border_radius;
    errorMessage.innerHTML = `<p>${error}</p><a class="close" href="#">Close</a>`;
    errorMessage.querySelector(".close").addEventListener("click", (e) => {
      e.preventDefault();
      errorMessage.classList.remove("dl-is-visible");
      // One second after close animation ends, remove the error message
      setTimeout(() => {
        errorMessage.remove();
      }, 1000);
    });
    container.appendChild(errorMessage);
    // 300ms after error message is added, show the error message
    setTimeout(() => {
      errorMessage.classList.add("dl-is-visible");
      // Five seconds after error message is shown, remove the error message
      setTimeout(() => {
        errorMessage.querySelector(".close").click();
      }, 5000);
    }, 300);
  }
  startConfetti(key) {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 100000,
      useWorker: false,
      colors: this.options[key].confetti,
    };

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }
  celebrate(key, animate = true) {
    const videoElement = this.container[key].querySelector("video");
    if (videoElement) {
      videoElement.pause();
    }
    const containerID = this.containerID[key];
    const leftContainer = document.querySelector(
      `#${containerID} .dl-content .left`
    );
    const newLogo =
      'data:image/svg+xml;utf8,<svg width="146" height="146" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M73 146c40.317 0 73-32.683 73-73S113.317 0 73 0 0 32.683 0 73s32.683 73 73 73z" fill="%23fff"/><path d="M36.942 53.147H25.828L14.49 95.107h9.391l4.553-16.321-.502 2.15c6.335.55 20.226.661 22.235-14.668 2.003-14.83-13.225-13.121-13.225-13.121zm1.056 17.533c-3.168 2.978-7.725 1.93-7.725 1.93l1.278-4.686 1.722-6.232c.667-.055 5.224-.551 6.503.498 1.39 1.103.39 6.451-1.78 8.492l.002-.002zM78.513 56.345a6.223 6.223 0 0 0-3.169-2.537c-8.057-2.595-14.671 3.529-19.284 9.428a37.298 37.298 0 0 0-7.558 21.394c.222 4.577 1.334 9.704 6.058 11.524 7.724 1.93 13.394-4.577 17.56-9.98.444-.771 1.222-1.433 1.222-2.316-.333-.165-.612-.44-1.005-.44a29.047 29.047 0 0 1-2.89 3.693c-2.666 2.592-6.057 4.632-9.948 3.75-4.279-1.93-4.446-6.893-4.056-11.193.193-1.652.566-3.28 1.112-4.852l2.889-.828c6.39-2.095 13.944-2.536 18.228-8.932 1.445-2.427 2.612-6.065.835-8.713l.006.002zM64.286 70.46c-8.725 2.812-6.558 1.654-6.558 1.654s6.668-19.74 13.448-17.425c6.892 2.316 1.885 12.963-6.892 15.77h.002zM83.46 53.312l27.899-.165-2.445 9.042-9.114.166-9.282 32.752H80.29L89.24 62.3h-8.392l2.613-8.988zM119.471 53.256l-20.34 41.796h10.504l3.224-6.892h9.448v6.837l9.226-.055V53.147l-12.06.11h-.002zm-2.834 26.631 5.558-11.965.055-.165v12.13h-5.613z" fill="%23FEBA4B"/></svg>';
    const logo = leftContainer.querySelector(".dl-logo");
    if (!animate) {
      leftContainer.classList.add("celebrating");
      if (logo) {
        logo.src = newLogo;
        logo.style.maxWidth = "98px";
        logo.style.transform = "translateX(-50%)";
        logo.style.left = "50%";
        logo.style.top = "20px";
      }
      const frame1 = leftContainer.querySelector(".frame1");
      frame1.style.bottom = "360px";
      const celebratingDiv = document.querySelector(
        `#${containerID} .dl-celebration`
      );
      celebratingDiv.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="46" height="38" fill="none" viewBox="0 0 46 38"><path fill="%23C92533" d="M33.707 0C29.268 0 25.174 2.166 23 5.664 20.826 2.166 16.732 0 12.293 0 5.504 0 0 5.693 0 11.83 0 27.245 23 38 23 38s23-10.755 23-26.17C46 5.693 40.496 0 33.707 0z"/></svg>')`;
      celebratingDiv.style.backgroundSize = "80%";
      celebratingDiv.style.backgroundPosition = "center 215px";
      celebratingDiv.style.backgroundRepeat = "no-repeat";
      return;
    }
    if (this.isMobile()) {
      this.startConfetti(key);
      return;
    }

    // Left Animation
    leftContainer.classList.add("celebrating");
    if (logo) {
      logo.src = newLogo;
    }
    this.loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.0/gsap.min.js",
      () => {
        const tl = gsap.timeline({
          onComplete: this.startBunny(key),
        });
        if (logo) {
          tl.to(`#${containerID} .dl-logo`, {
            duration: 1,
            x: "50%",
            right: "50%",
            top: "155px",
            maxWidth: "145px",
            ease: "power1.inOut",
          });
        }
        tl.to(
          `#${containerID} .frame1`,
          {
            bottom: "150px",
            duration: 1,
            ease: "power1.inOut",
          },
          ">-1"
        );
        if (logo) {
          tl.to(`#${containerID} .dl-logo`, {
            duration: 1,
            delay: 1,
            top: "20px",
            maxWidth: "98px",
            ease: "power1.inOut",
          });
        }
        tl.to(
          `#${containerID} .frame1`,
          {
            bottom: "360px",
            duration: 1,
            ease: "power1.inOut",
          },
          ">-1"
        );
      }
    );
  }
  startBunny(key) {
    const containerID = this.containerID[key];
    this.loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.14/lottie.min.js",
      () => {
        const tl2 = gsap.timeline();
        tl2.to(`#${containerID} .frame2`, {
          opacity: "1",
          duration: 1,
          ease: "power1.inOut",
        });
        tl2.add(() => {
          const anim = bodymovin.loadAnimation({
            container: document.querySelector(
              `#${containerID} .bunnyAnimation`
            ),
            renderer: "svg",
            loop: false,
            autoplay: true,
            path: "https://000665513.codepen.website/data.json",
          });
          anim.addEventListener("complete", () => {
            if (this.animationCount > 3) {
              anim.goToAndPlay(130, true);
              this.animationCount++;
            } else {
              this.startConfetti(key);
            }
          });
        }, "+=0.5");
        // Make the text grow
        tl2.fromTo(
          `#${containerID} .frame3`,
          1,
          { scale: 0 },
          { scale: 1 },
          "+=6"
        );
      }
    );
  }

  shake(key) {
    const content = this.container[key].querySelector(".dl-content");
    if (content) {
      content.classList.add("shake");
      // Remove class after 1 second
      setTimeout(() => {
        content.classList.remove("shake");
      }, 1000);
    } else {
      this.container[key].classList.add("shake");
      // Remove class after 1 second
      setTimeout(() => {
        this.container[key].classList.remove("shake");
      }, 1000);
    }
  }
  setCookie(key, hours = 24, path = "/") {
    const cookieName = this.options[key].cookie_name || "HidePetaMultistep";
    const expires = new Date(Date.now() + hours * 36e5).toUTCString();
    document.cookie = `${cookieName}=${encodeURIComponent(
      true
    )}; expires=${expires}; path=${path}`;
  }

  getCookie(key) {
    const cookieName = this.options[key].cookie_name || "HidePetaMultistep";
    console.log(cookieName);
    return document.cookie.split("; ").reduce((r, v) => {
      const parts = v.split("=");
      return parts[0] === cookieName ? decodeURIComponent(parts[1]) : r;
    }, "");
  }

  deleteCookie(key, path = "/") {
    const cookieName = this.options[key].cookie_name || "HidePetaMultistep";
    setCookie(cookieName, "", -1, path);
  }
  loadScript(url, callback) {
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }
  sendGAEvent(category, action, label) {
    if ("sendEvent" in window) {
      window.sendEvent(category, action, label, null);
    } else {
      window.dataLayer.push({
        event: "event",
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
      });
    }
  }
  isMobile() {
    // Check the viewport width to see if the user is using a mobile device
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    return viewportWidth <= 799;
  }
  loadHero(key) {
    if (!this.options[key].video) {
      return `<img class="dl-hero" src="${this.options[key].image}" alt="${this.options[key].title}" />`;
    }
    const autoplay = this.options[key].autoplay || false;
    let markup = autoplay
      ? `<video autoplay muted loop playsinline`
      : `<video playsinline`;
    markup += ` poster="${this.options[key].image}">`;
    markup += `<source src="${this.options[key].video}" type="video/mp4">`;
    markup += `</video>`;
    return `<div class="dl-hero">
    ${markup}
    ${
      !autoplay
        ? `<div class="btn-play">
              <svg class="play-svg" xmlns="http://www.w3.org/2000/svg" width="26" height="31" viewBox="0 0 55.127 61.182"><g id="Group_38215" data-name="Group 38215" transform="translate(30 35)" fill="currentColor"><g id="play-button-arrowhead_1_" data-name="play-button-arrowhead (1)" transform="translate(-30 -35)"><path id="Path_18" data-name="Path 18" d="M18.095,1.349C12.579-1.815,8.107.777,8.107,7.134v46.91c0,6.363,4.472,8.952,9.988,5.791l41-23.514c5.518-3.165,5.518-8.293,0-11.457Z" transform="translate(-8.107 0)"/></g></g></svg>
            </div>

            <div class="btn-pause">
              <svg class="pause-svg" xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31"><path d="M10 31h-6v-31h6v31zm15-31h-6v31h6v-31z" fill="currentColor" /></svg>
            </div>`
        : ""
    }
    </div>`;
  }
  isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      // rect.bottom <=
      //   (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  cleanUp() {
    // Remove all the elements
    this.multisteps.forEach((multistep) => {
      if (this.isDebug()) {
        console.log(
          `PetaMultistep: Cleaning up ${multistep.id}`,
          multistep.dataset
        );
      }
      multistep.remove();
    });
  }

  isDebug() {
    const regex = new RegExp("[\\?&]debug=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
