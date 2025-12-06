import {
  Box,
  Typography,
  Stack,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";

type Track = {
  title: string;
  duration: string;
};

type AlbumWithTracks = {
  title: string;
  image: string;
  tracks: Track[];
};

type PopularTracksProps = {
  albums: AlbumWithTracks[];
  loading: boolean;
};

export default function PopularTracks({ albums, loading }: PopularTracksProps) {
  const primaryAlbum = albums[0];
  const tracks = primaryAlbum?.tracks ?? [];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ color: "white", fontWeight: 600, mb: 2 }}>
        Recent Album
      </Typography>

      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,0.03)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 4 }}>
            <CircularProgress size={28} color="inherit" />
          </Stack>
        ) : !primaryAlbum ? (
          <Box sx={{ px: 3, py: 3 }}>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.9rem",
              }}
            >
              No tracks available.
            </Typography>
          </Box>
        ) : (
          <>
            {/* Header */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ px: 3, py: 2 }}
            >
              <Avatar
                variant="rounded"
                src={primaryAlbum.image}
                sx={{ width: 64, height: 64 }}
              />

              <Box>
                <Typography sx={{ color: "white", fontWeight: 600 }}>
                  {primaryAlbum.title}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.85rem",
                  }}
                >
                  {tracks.length} tracks
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

            {/* Track list w/ separators */}
            {tracks.map((track, index) => (
              <Box key={track.title}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    px: 3,
                    py: 1.3,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.06)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      width: "24px",
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "0.9rem",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </Typography>

                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {track.title}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "0.8rem",
                    }}
                  >
                    {track.duration}
                  </Typography>
                </Stack>

                {/* adds a line between each track */}
                {index !== tracks.length - 1 && (
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
                )}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}
