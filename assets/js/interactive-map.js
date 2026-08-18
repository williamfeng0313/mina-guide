(function () {
  "use strict";

  const DATA = window.MINA_INTERACTIVE_MAP_DATA;
  if (!DATA || !DATA.regions) return;

  const STORAGE_KEY = "minaInteractiveMapFoundV1";

  const regionSelect = document.getElementById("imap-region");
  const searchInput = document.getElementById("imap-search");
  const filterWrap = document.getElementById("imap-filters");
  const visibleCount = document.getElementById("imap-visible-count");
  const foundCount = document.getElementById("imap-found-count");
  const image = document.getElementById("imap-image");
  const stage = document.getElementById("imap-stage");
  const markerLayer = document.getElementById("imap-markers");
  const locationList = document.getElementById("imap-location-list");
  const emptyState = document.getElementById("imap-empty");
  const regionTitle = document.getElementById("imap-region-title");
  const regionDescription = document.getElementById("imap-region-description");
  const regionGuide = document.getElementById("imap-region-guide");
  const detailPanel = document.getElementById("imap-detail-panel");
  const detailType = document.getElementById("imap-detail-type");
  const detailName = document.getElementById("imap-detail-name");
  const detailLocation = document.getElementById("imap-detail-location");
  const detailNote = document.getElementById("imap-detail-note");
  const detailFound = document.getElementById("imap-detail-found");
  const detailGuide = document.getElementById("imap-detail-guide");
  const detailSource = document.getElementById("imap-detail-source");
  const copyLinkButton = document.getElementById("imap-copy-link");
  const resetButton = document.getElementById("imap-reset");
  const adminReadout = document.getElementById("imap-admin-readout");
  const adminCoordinates = document.getElementById("imap-admin-coordinates");
  const copyCoordinates = document.getElementById("imap-copy-coordinates");

  let activeFilter = "all";
  let selectedLocationId = null;
  let lastCoordinateText = "";

  function loadFound() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function saveFound(found) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  }

  let foundState = loadFound();

  function currentRegionKey() {
    return regionSelect.value;
  }

  function currentRegion() {
    return DATA.regions[currentRegionKey()];
  }

  function keyFor(location) {
    return currentRegionKey() + "::" + location.id;
  }

  function isFound(location) {
    return foundState[keyFor(location)] === true;
  }

  function setFound(location, value) {
    foundState[keyFor(location)] = value === true;
    saveFound(foundState);
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[’']/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function hasCoordinates(location) {
    return (
      typeof location.x === "number" &&
      typeof location.y === "number" &&
      location.x >= 0 &&
      location.x <= 100 &&
      location.y >= 0 &&
      location.y <= 100
    );
  }

  function filteredLocations() {
    const region = currentRegion();
    const query = normalize(searchInput.value);

    return region.locations.filter(function (location) {
      const typeMatch = activeFilter === "all" || location.type === activeFilter;
      const haystack = normalize(
        location.name + " " + location.sublocation + " " + location.note
      );
      const queryMatch = !query || haystack.includes(query);
      return typeMatch && queryMatch;
    });
  }

  function updateUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("region", currentRegionKey());
    if (activeFilter !== "all") {
      url.searchParams.set("filter", activeFilter);
    } else {
      url.searchParams.delete("filter");
    }
    history.replaceState({}, "", url);
  }

  function renderRegion() {
    const region = currentRegion();

    regionTitle.textContent = region.name;
    regionDescription.textContent = region.description;
    regionGuide.href = region.guideUrl;
    image.src = region.image;
    image.alt = region.name + " map reference for Mina the Hollower";

    selectedLocationId = null;
    detailPanel.hidden = true;

    renderLocations();
    updateUrl();
  }

  function renderLocations() {
    const region = currentRegion();
    const visible = filteredLocations();

    locationList.innerHTML = "";
    markerLayer.innerHTML = "";

    visible.forEach(function (location) {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "imap-location-card";
      if (isFound(location)) card.classList.add("is-found");

      const top = document.createElement("div");
      top.className = "imap-location-top";

      const type = document.createElement("span");
      type.className = "imap-type-badge";
      type.textContent = location.type;

      const found = document.createElement("span");
      found.className = "imap-found-badge";
      found.textContent = isFound(location) ? "Found" : "Not found";

      top.appendChild(type);
      top.appendChild(found);

      const name = document.createElement("h3");
      name.textContent = location.name;

      const sub = document.createElement("div");
      sub.className = "imap-location-sub";
      sub.textContent = location.sublocation;

      const note = document.createElement("div");
      note.className = "imap-location-note";
      note.textContent = location.note;

      card.appendChild(top);
      card.appendChild(name);
      card.appendChild(sub);
      card.appendChild(note);

      card.addEventListener("click", function () {
        openDetail(location);
      });

      locationList.appendChild(card);

      if (hasCoordinates(location)) {
        const marker = document.createElement("button");
        marker.type = "button";
        marker.className = "imap-marker";
        marker.dataset.type = location.type;
        marker.style.left = location.x + "%";
        marker.style.top = location.y + "%";
        marker.textContent = location.type === "boss" ? "B" : "T";
        marker.title = location.name + " — " + location.sublocation;
        marker.setAttribute("aria-label", marker.title);

        if (isFound(location)) marker.classList.add("is-found");

        marker.addEventListener("click", function () {
          openDetail(location);
        });

        markerLayer.appendChild(marker);
      }
    });

    const foundInRegion = region.locations.filter(isFound).length;
    visibleCount.textContent = visible.length + " visible";
    foundCount.textContent =
      foundInRegion + " / " + region.locations.length + " found";

    emptyState.hidden = visible.length !== 0;
  }

  function openDetail(location) {
    selectedLocationId = location.id;

    detailType.textContent =
      location.type === "boss" ? "Boss" : "Trinket";
    detailName.textContent = location.name;
    detailLocation.textContent =
      currentRegion().name + ": " + location.sublocation;
    detailNote.textContent = location.note;

    detailGuide.href = location.guideUrl;
    detailSource.href = location.sourceUrl;

    detailFound.textContent = isFound(location)
      ? "Mark as Not Found"
      : "Mark as Found";

    detailFound.classList.toggle("is-found", isFound(location));
    detailPanel.hidden = false;

    if (hasCoordinates(location)) {
      const wrap = document.querySelector(".imap-stage-wrap");
      if (wrap) {
        wrap.scrollTo({
          left: Math.max(0, stage.scrollWidth * (location.x / 100) - wrap.clientWidth / 2),
          top: Math.max(0, stage.scrollHeight * (location.y / 100) - wrap.clientHeight / 2),
          behavior: "smooth"
        });
      }
    }
  }

  function selectedLocation() {
    if (!selectedLocationId) return null;
    return currentRegion().locations.find(function (location) {
      return location.id === selectedLocationId;
    }) || null;
  }

  function setActiveFilter(filter) {
    const allowed = ["all", "trinket", "boss"];
    activeFilter = allowed.includes(filter) ? filter : "all";

    filterWrap.querySelectorAll("[data-filter]").forEach(function (button) {
      button.classList.toggle(
        "is-active",
        button.dataset.filter === activeFilter
      );
    });

    renderLocations();
    updateUrl();
  }

  regionSelect.addEventListener("change", renderRegion);

  searchInput.addEventListener("input", function () {
    renderLocations();
  });

  filterWrap.addEventListener("click", function (event) {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    setActiveFilter(button.dataset.filter);
  });

  detailFound.addEventListener("click", function () {
    const location = selectedLocation();
    if (!location) return;
    setFound(location, !isFound(location));
    openDetail(location);
    renderLocations();
  });

  resetButton.addEventListener("click", function () {
    const region = currentRegion();
    const confirmed = window.confirm(
      "Reset found progress for " + region.name + "?"
    );
    if (!confirmed) return;

    region.locations.forEach(function (location) {
      delete foundState[keyFor(location)];
    });

    saveFound(foundState);
    detailPanel.hidden = true;
    selectedLocationId = null;
    renderLocations();
  });

  copyLinkButton.addEventListener("click", async function () {
    updateUrl();
    try {
      await navigator.clipboard.writeText(window.location.href);
      copyLinkButton.textContent = "Copied";
      setTimeout(function () {
        copyLinkButton.textContent = "Copy Region Link";
      }, 1400);
    } catch (error) {
      window.prompt("Copy this link:", window.location.href);
    }
  });

  const params = new URLSearchParams(window.location.search);
  const requestedRegion = params.get("region");
  const requestedFilter = params.get("filter");

  if (requestedRegion && DATA.regions[requestedRegion]) {
    regionSelect.value = requestedRegion;
  }

  if (requestedFilter) {
    activeFilter = requestedFilter;
  }

  /* Coordinate helper:
     Add ?edit=1 to the URL, then click the map.
     This is intentionally admin-only and does not change public data by itself. */
  if (params.get("edit") === "1") {
    adminReadout.hidden = false;

    stage.addEventListener("click", function (event) {
      const rect = image.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return;
      }

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      lastCoordinateText =
        "x: " + x.toFixed(2) + ", y: " + y.toFixed(2);

      adminCoordinates.textContent = lastCoordinateText;
    });

    copyCoordinates.addEventListener("click", async function () {
      if (!lastCoordinateText) return;
      try {
        await navigator.clipboard.writeText(lastCoordinateText);
        copyCoordinates.textContent = "Copied";
        setTimeout(function () {
          copyCoordinates.textContent = "Copy";
        }, 1200);
      } catch (error) {
        window.prompt("Copy coordinates:", lastCoordinateText);
      }
    });
  }

  setActiveFilter(activeFilter);
  renderRegion();
})();
