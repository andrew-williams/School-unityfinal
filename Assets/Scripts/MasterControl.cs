using UnityEngine;
using System.Collections;

public class MasterControl : MonoBehaviour {
	public AudioClip outOfWater;
	public AudioClip inWater;

	void Start() {
		audio.clip = outOfWater;
		audio.Play();
	}
	
	public void ChangeTrackTo( int opt ) {
		if ( opt == 2 ) 
			audio.clip = inWater;
		else 
			audio.clip = outOfWater;
		audio.Play();
	}	
}