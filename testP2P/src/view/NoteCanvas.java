package view;

import java.awt.Canvas;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Point;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;

public class NoteCanvas extends Canvas implements MouseMotionListener, MouseListener{
	static final long serialVersionUID = 5976281278513438960L;
	private int note;
	
	
	/**
	 * Crée une instance qui affiche les étoiles en fonction de la note, non éditable
	 * @param note
	 */
	public NoteCanvas(int note) {
		this.note = note;
	}
	
	/**
	 * Créer une instance éditable (on peut "noter")
	 */
	public NoteCanvas() {
		this.addMouseMotionListener(this);
		this.addMouseListener(this);
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseExited(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mousePressed(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		Point p = e.getPoint();
		int oldNote = note;
		note = (int) ((float)e.getX() / (float)this.getWidth() * 5);
		//System.out.println(note);
		
		if(oldNote != note) this.repaint();
	}
	
	private void drawSquare(Graphics g, int place) {
		if(place <= note) {
			if(note == 1) g.setColor(Color.red);
			if(note == 2) g.setColor(Color.pink);
			if(note == 3) g.setColor(Color.orange);
			if(note == 4) g.setColor(Color.yellow);
			if(note == 5) g.setColor(Color.green);
			
		}
		else g.setColor(Color.lightGray);
		
		int x = place * this.getWidth()/6;
		int y = (5 - place) * this.getHeight()/6;
		int width = this.getWidth()/6 - 2;
		int height = this.getHeight();
		g.fillRect(x, y, width, height);
	}
	
	public void paint(Graphics g) {
		g.clearRect(0, 0, this.getWidth(), this.getHeight());
		for(int i = 1; i <= 5; i++) {
			drawSquare(g, i);
		}
	}

}