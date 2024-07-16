using UnityEngine;
using System.Collections;

public class MaterialChanger : MonoBehaviour {
	public float respawnTime = 5.0f;
	public GameObject _mhObj;
	public AudioClip track;
	public AudioClip splash;
	
	private bool hidden = false;
	private MaterialHolder _mh;
	private float hideTime;

	void Start () {
		//_mhObj = GameObject.Find("Material Holder");
		_mh = _mhObj.GetComponent<MaterialHolder>();
		/* or combined:
			_mh = GameObject.Find("Material Holder").GetComponent<MaterialHolder>();
		*/
		renderer.material = _mh.materialArray[0];
	}
	
	void Update () {
		if ( hidden && Time.time >= hideTime + respawnTime ) { 
			Activate(true);
		}
	}
	
	void OnMouseEnter() {
        renderer.material = _mh.materialArray[1];
		audio.clip = track;
		audio.Play();
    }
	
	void OnMouseOver() {
		if ( Input.GetMouseButtonDown(0) ) {
			Activate(false);
			audio.clip = splash;
			audio.Play();
		}
	}
	
	void OnMouseExit() {
        renderer.material = _mh.materialArray[0];
    }
	
	void Activate( bool bIn ) {
		renderer.enabled = bIn;
		collider.enabled = bIn;
		if ( !bIn ) { hideTime = Time.time; }
		hidden = !bIn;
	}
}








