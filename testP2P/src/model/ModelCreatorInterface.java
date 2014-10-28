package model;

public interface ModelCreatorInterface {
	
	
	/**
	 * G�n�re un mod�le
	 */
	public ObjetPdfModel createModel();
	
	
	/**
	 * Cr�e le fichier PDF
	 */
	public void createPDF();

}