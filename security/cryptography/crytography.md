# CryptoGraphy

## more security concept: - 

### timing based attack: - 
crypto.timingSafeEqual is Node's built-in defense against timing attacks when comparing secrets — like signatures, tokens, or hashes.

The problem it solves: - 
A normal === or Buffer.equals() comparison short-circuits: it stops as soon as it finds the first mismatched byte.

What timingSafeEqual does differently: - 
It always compares every byte of both buffers, regardless of where the first mismatch occurs, so the execution time depends only on the buffer length — not on the content. Roughly: