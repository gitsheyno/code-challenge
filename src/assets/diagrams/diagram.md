# Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant ArtistSelector
    participant Festivals
    participant ArtistInfo
    participant ServiceLayer
    participant APILayer

    User->>ArtistSelector: Select Artists
    ArtistSelector->>Festivals: Emit selectedArtists
    Festivals->>ServiceLayer: getFestivalsByArtists(selectedArtists)
    ServiceLayer->>APILayer: fetchFestivals(artistIds)
    APILayer-->>ServiceLayer: Festival Data
    ServiceLayer-->>Festivals: Festival Data
    Festivals->>ArtistInfo: Render Artists in Festival
    ArtistInfo->>ServiceLayer: getArtistData(artistId)
    ServiceLayer->>APILayer: fetchArtist(artistId)
    APILayer-->>ServiceLayer: Artist Data
    ServiceLayer-->>ArtistInfo: Artist Data
```
