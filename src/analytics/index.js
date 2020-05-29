import ReactGA from "react-ga"

export const homeClickTrack = () => {
  ReactGA.event({
    category: "search",
    action: "click",
    label: "Home na Menu Bar",
  })
}

export const searchClickTrack = () => {
  ReactGA.event({
    category: "search",
    action: "click",
    label: "Search na Menu Bar",
  })
}

export const menuTracker = () => {
  ReactGA.event({
    category: "menu",
    action: "click",
    label: "Link Menu na Menu Bar",
  })
}

export const topClickTrack = () => {
  ReactGA.event({
    category: "top",
    action: "click",
    label: `Top na Menu Bar`,
  })
}

export const menuLinkClickTrack = link => {
  ReactGA.event({
    category: "menu link",
    action: "click",
    label: `Menu Link - ${link}`,
  })
}

export const socialLinkClickTrack = social => {
  ReactGA.event({
    category: "social link",
    action: "click",
    label: social,
  })
}

export const recommendedClickTrack = () => {
  ReactGA.event({
    category: "menu link",
    action: "click",
    label: "Recommend Link",
  })
}
