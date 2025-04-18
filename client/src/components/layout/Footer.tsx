import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              GAME STORE
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The ultimate destination for gamers, featuring the latest games, hardware, and merchandise.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="GitHub">
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Shop
            </Typography>
            <Link href="/?category=game" color="text.secondary" display="block" variant="body2">
              Games
            </Link>
            <Link href="/?category=hardware" color="text.secondary" display="block" variant="body2">
              Hardware
            </Link>
            <Link href="/?category=merchandise" color="text.secondary" display="block" variant="body2">
              Merchandise
            </Link>
          </Grid>
          
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support
            </Typography>
            <Link href="#" color="text.secondary" display="block" variant="body2">
              Contact Us
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2">
              FAQs
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2">
              Shipping
            </Link>
          </Grid>
          
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="#" color="text.secondary" display="block" variant="body2">
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2">
              Terms of Service
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2">
              Refund Policy
            </Link>
          </Grid>
        </Grid>
        
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' Game Store. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}