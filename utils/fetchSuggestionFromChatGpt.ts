
const fetchSuggestionFromChatGpt = () => {
  const fetchData = fetch("/api/suggetion", {
    cache:"no-store"
  }).then(res=>res.json())

  return fetchData
}

export default fetchSuggestionFromChatGpt
