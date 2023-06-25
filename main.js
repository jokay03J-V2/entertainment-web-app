import "@jokay03j-v2/sasslib";
import "./style.scss";
import datas from "./assets/data.json";

const trendingContainer = document.getElementById("trending");
const recommendedContainer = document.getElementById("recommended");
const params = new URLSearchParams(document.location.search);

if (params.has("query")) {
  const query = params.get("query");

  document.querySelector("#trendingSection").remove();
  document.querySelector("#query").value = query;

  const result = getQuery(query, datas);

  document.querySelector("#recommendedSection h2").innerHTML = `Found ${
    result.length
  } result${result.length > 1 ? "s" : ""} for « ${query} »`;

  for (let index = 0; index < result.length; index++) {
    const element = result[index];
    let dataFolder = element.title.toLowerCase().replaceAll(/[ ]/g, "-");
    dataFolder = dataFolder.replaceAll(/['’:]/g, "");

    recommendedContainer.innerHTML += `
            <li class="item">
              <article>
                <img src="./assets/thumbnails/${dataFolder}/regular/small.jpg" alt="" />
                <div class="byline d--flex w--full items--center">
                  <time datetime="${element.year}" title="${element.year}">${
      element.year
    }</time>
                  <span class="divider">·</span>
                  <span class="type"
                    ><img src="./assets/icon-category-${
                      element.category === "Movie" ? "movie" : "tv"
                    }.svg" alt="${
      element.category === "Movie" ? "movie" : "tv"
    } icon"
                  />${element.category === "Movie" ? "Movie" : "Serie"}</span>
                  <span class="divider">·</span>
                  <span class="rating">${element.rating}</span>
                </div>
                <h3>${element.title}</h3>
                <button ${
                  element.isBookmarked && "bookmarked"
                }>bookmark</button>
              </article>
            </li>
  `;
  }
} else {
  for (let indexDatas = 0; indexDatas < datas.length; indexDatas++) {
    const data = datas[indexDatas];
    let dataFolder = data.title.toLowerCase().replaceAll(/[ ]/g, "-");
    dataFolder = dataFolder.replaceAll(/['’:]/g, "");

    if (data.isTrending) {
      trendingContainer.innerHTML += `<li>
              <article class="trending--card" style="background-image: linear-gradient(#ffffff00, rgba(0, 0, 0, 0.7)), url(./assets/thumbnails/${dataFolder}/trending/small.jpg);">
                <h3>${data.title}</h3>
                <div class="byline d--flex w--full items--center">
                  <time datetime="${data.year}" title="${data.year}">${
        data.year
      }</time>
                  <span class="divider">·</span>
                  <span class="type"
                    ><img
                      src="./assets/icon-category-${
                        data.category === "Movie" ? "movie" : "tv"
                      }.svg"
                      alt="movie icon"
                    />${data.category === "Movie" ? "Movie" : "Serie"}</span
                  >
                  <span class="divider">·</span>
                  <span class="rating">PG</span>
                </div>
                <button ${data.isBookmarked && "bookmarked"}>bookmark</button>
              </article>
            </li>`;
    }

    recommendedContainer.innerHTML += `
            <li class="item">
              <article>
                <img src="./assets/thumbnails/${dataFolder}/regular/small.jpg" alt="" />
                <div class="byline d--flex w--full items--center">
                  <time datetime="${data.year}" title="${data.year}">${
      data.year
    }</time>
                  <span class="divider">·</span>
                  <span class="type"
                    ><img src="./assets/icon-category-${
                      data.category === "Movie" ? "movie" : "tv"
                    }.svg" alt="${
      data.category === "Movie" ? "movie" : "tv"
    } icon"
                  />${data.category === "Movie" ? "Movie" : "Serie"}</span>
                  <span class="divider">·</span>
                  <span class="rating">${data.rating}</span>
                </div>
                <h4>${data.title}</h4>
                <button ${data.isBookmarked && "bookmarked"}>bookmark</button>
              </article>
            </li>
  `;
  }
}

function getQuery(title, arr) {
  let result = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element.title.toLowerCase().includes(title)) {
      result.push(element);
    }
  }

  return result;
}
