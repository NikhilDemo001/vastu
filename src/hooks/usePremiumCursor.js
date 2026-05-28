import { useEffect } from 'react';

export const usePremiumCursor = () => {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0, rafId;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    };

    const animate = () => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      rafId = requestAnimationFrame(animate);
    };
    animate();
    document.addEventListener('mousemove', move);

    const addHover = () => {
      document.querySelectorAll('a, button, [role="button"], .card-surface, .card-glass, .card-premium, .product-card').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('is-hovering');
          ring.classList.add('is-hovering');
        });
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('is-hovering');
          ring.classList.remove('is-hovering');
        });
      });
    };
    addHover();

    document.addEventListener('mousedown', () => {
      dot.classList.add('is-clicking'); ring.classList.add('is-clicking');
    });
    document.addEventListener('mouseup', () => {
      dot.classList.remove('is-clicking'); ring.classList.remove('is-clicking');
    });

    const mo = new MutationObserver(addHover);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafId);
      mo.disconnect();
      dot.remove(); ring.remove();
    };
  }, []);
};
